import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/index";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import * as utils from "./utils";
import * as UserService from "./services/UserService";
import { resetUser, updateUser } from "./redux/UserSlice/UserSlice";
import { ToastContainer, Zoom } from "react-toastify";
function App() {

  let { i18n } = useTranslation();
  const getLanguage = () => {
    let lang = localStorage.getItem("language");
    if (lang) {
      i18n.changeLanguage(lang);
    }
  };

  const dispatch = useDispatch(); //dùng để gọi redux
  let user = useSelector((state) => state.user); //dùng để gọi redux để lấy dữ liệu

  // function
  const handleDecoded = () => {
    let access_token = (user && user.access_token) || localStorage.getItem("access_token");
    let decoded = {};
    if (access_token && utils.isJsonString(access_token) && !user.access_token) {
      access_token = JSON.parse(access_token);
      decoded = jwtDecode(access_token);
    }
    return { access_token, decoded };
  };
  const handleGetDetailUser = async (data) => {
    let storageRefreshToken = localStorage.getItem("refresh_token");
    let refresh_token = JSON.parse(storageRefreshToken);
    const res = await UserService.getDetailUser(data);

    dispatch(updateUser({ ...res.user, access_token: data.access_token, refresh_token: refresh_token }));
  };
  // useEffect
  useEffect(() => {
    const { decoded, access_token } = handleDecoded();
    if (decoded && decoded.id) {
      handleGetDetailUser({ id: decoded.id, access_token });
    }
  }, []);

  // axios
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refresh_token = JSON.parse(storageRefreshToken);
      let decodedRefreshToken = jwtDecode(refresh_token);
      if (decoded && decoded.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken && decodedRefreshToken.exp > currentTime.getTime() / 100) {
          const data = await UserService.refreshToken({ id: decoded.id, refresh_token: refresh_token });
          config.headers["token"] = `Bearer ${data && data.access_token}`;
        } else {
          dispatch(resetUser());
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  useEffect(() => {
    getLanguage();
  }, []);
  return (
    <div className="App">
      {/* React-router-dom  : định tuyến */}
      <Router>
        <Routes>
          {routes &&
            routes.length > 0 && 
            routes.map((item, index) => {
              let Page = item.page; // tạo page 
              let path = item.path;
              let Layout = item.layout === "l1" ? DefaultLayout : item.layout === "l2" ? AdminLayout : Fragment;
              return (
                <Route
                  key={index}
                  path={
                    item.isLogin
                      ? user?.username !== ""
                        ? item?.isAdmin
                          ? user?.isAdmin === true
                            ? path
                            : ""
                          : path
                        : ""
                      : path
                  }
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Zoom}
      />
      {/* Same as */}
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
