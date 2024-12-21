import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";

import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/UserSlice/UserSlice";
import "./SignInComponent.scss";
function SignInComponent() {
  let [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  let location = useLocation();
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let { t, i18n } = useTranslation();
  //   get data
  let mutation = useMutationHook((data) => UserService.signIn(data));
  let { data } = mutation;
  let navigate = useNavigate();
  //   function
  const handleOnchange = (e) => {
    let copyState = { ...userInfo };
    copyState[e.target.name] = e.target.value;
    setUserInfo({
      ...copyState,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    await mutation.mutate(userInfo);
  };
  const handleGetDetailUser = async (data) => {
    let storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailUser(data);
    dispatch(updateUser({ ...res.user, access_token: data.access_token, refresh_token: refreshToken }));
  };

  useEffect(() => {
    if (data && data.status === "OK") {
      localStorage.setItem("access_token", JSON.stringify(data && data.access_token));
      localStorage.setItem("refresh_token", JSON.stringify(data && data.refresh_token));
      if (data && data.access_token) {
        const decoded = jwtDecode(data.access_token);

        if (decoded && decoded.id) {
          handleGetDetailUser({ id: decoded.id, isAdmin: decoded.isAdmin, access_token: data?.access_token });
          toast.success(t("loginSuccess"));
          if (location.state) {
            navigate(`${location.state}`);
          } else navigate("/");
        }
      }
    }
    if (data && data.status === "ERROR") {
      toast.error(i18n.language === "en" ? "Username or Password is incorrect" : "Tài khoản hoặc Mật khẩu không đúng");
    }
  }, [data]);

  useEffect(() => {
    if (user && user.username) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="sign-in_container">
      <form onSubmit={handleSignIn} className="form-login_wrapper">
        <div className="row">
          <div className="title col col-12">{t("login")}</div>
          <div className="form-group col col-12">
            <label htmlFor="username">{t("username")}:</label>
            <input
              onChange={(e) => handleOnchange(e)}
              className="form-control"
              type="text"
              name="username"
              id="username"
              value={userInfo.username}
              required
            />
          </div>
          <div className="form-group col col-12">
            <label htmlFor="password">{t("password")}:</label>
            <input
              onChange={(e) => handleOnchange(e)}
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={userInfo.password}
              required
            />
          </div>
          <div className="sign-up_wrapper col col-12">
            {t("noAccount")}&nbsp;{" "}
            <div className="sign-up_button" onClick={() => navigate("/dang-ky")}>
              {t("signUpNow")}
            </div>
          </div>
          <div className="button_wrapper">
            <button type="submit" className="btn btn_login">
              {t("login")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignInComponent;
