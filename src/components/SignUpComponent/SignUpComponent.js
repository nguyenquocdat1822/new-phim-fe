import { useEffect, useState } from "react";
import "./SignUpComponent.scss";
import * as UserService from "../../services/UserService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function SignUpComponent() {
  let [userData, setUserData] = useState({
    username: "",
    password: "",
    phoneNumber: "",
    address: "",
    filmHistory: [],
    displayName: "",
  });
  let user = useSelector((state) => state.user);
  let { t } = useTranslation();
  let navigate = useNavigate();
  const handleOnchange = (e) => {
    let copyState = { ...userData };
    copyState[e.target.name] = e.target.value;
    setUserData({
      ...copyState,
    });
  };
  const resetForm = () => {
    setUserData({ username: "", password: "", phoneNumber: "", address: "", filmHistory: [], displayName: "" });
  };
  const handleSignUp = async () => {
    let res = await UserService.signUn(userData);
    if (res && res.status === "OK") {
      toast.success(t("signUpSuccess"));
      navigate("/dang-nhap");
      resetForm();
    } else {
      toast.error(t("signUpError"));
    }
  };
  useEffect(() => {
    if (user && user.username) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="sign-up_container">
      <div className="form-sign-up_wrapper">
        <div className="row">
          <div className="title col col-12">{t("signUpNow")}</div>
          <div className="form-group col col-12">
            <label htmlFor="username">{t("username")}</label>
            <input
              required
              type="text"
              className="form-control"
              id="username"
              onChange={(e) => handleOnchange(e)}
              name="username"
              value={userData?.username}
            />
          </div>

          <div className="form-group col col-12">
            <label htmlFor="displayName">{t("displayName")}</label>
            <input
              required
              type="text"
              className="form-control"
              id="displayName"
              onChange={(e) => handleOnchange(e)}
              name="displayName"
              value={userData?.displayName}
            />
          </div>

          <div className="form-group col col-12">
            <label htmlFor="password">{t("password")}</label>
            <input
              required
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => handleOnchange(e)}
              name="password"
              value={userData?.password}
            />
          </div>

          <div className="form-group col col-6">
            <label htmlFor="address">{t("address")}</label>
            <input
              required
              type="text"
              className="form-control"
              id="address"
              onChange={(e) => handleOnchange(e)}
              name="address"
              value={userData?.address}
            />
          </div>
          <div className="form-group col col-6">
            <label htmlFor="phoneNumber">{t("phoneNumber")}</label>
            <input
              required
              type="text"
              className="form-control"
              id="phoneNumber"
              onChange={(e) => handleOnchange(e)}
              name="phoneNumber"
              value={userData?.phoneNumber}
            />
          </div>

          <div className="button_wrapper col col-12">
            <button type="button" onClick={() => handleSignUp()} className="btn btn_sign-up">
              {t("signUp")}
            </button>
            <button onClick={() => navigate("/")} className="btn btn_back-home" type="button">
              {t("homePage")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpComponent;
