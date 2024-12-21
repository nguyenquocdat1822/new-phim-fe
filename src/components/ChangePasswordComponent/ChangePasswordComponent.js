import { useState } from "react";
import "./ChangePasswordComponent.scss";
import { useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function ChangePasswordComponent() {
  let user = useSelector((state) => state.user);
  let navigate = useNavigate();
  let { i18n, t } = useTranslation();

  let [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleOnchange = (e) => {
    let copyState = { ...data };
    copyState[e.target.name] = e.target.value;
    setData({
      ...copyState,
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (user) {
      let res = await UserService.changePassword(user, data);
      if (res && res.status === "OK") {
        toast.success(i18n.language === "en" ? res?.message?.en : res?.message?.vi);
      } else {
        toast.error(i18n.language === "en" ? res?.message?.en : res?.message?.vi);
      }
    }
  };

  const backPre = () => {
    navigate("/thong-tin-ca-nhan");
  };
  return (
    <div className="change-password_container">
      <form className="form-change-password" onSubmit={handleChangePassword}>
        <div className="row">
          <div className="title col col-12">{t("changePass")}</div>
          <div className="form-group col col-12">
            <label htmlFor="currentPassword">{t("currPass")}</label>
            <input
              className="form-control"
              type="password"
              name="currentPassword"
              onChange={(e) => handleOnchange(e)}
              value={data?.currentPassword}
              required
            />
          </div>

          <div className="form-group col col-12">
            <label htmlFor="newPassword">{t("newPass")}</label>
            <input
              className="form-control"
              type="password"
              name="newPassword"
              onChange={(e) => handleOnchange(e)}
              value={data?.newPassword}
              required
            />
          </div>
          <div className="form-group col col-12">
            <label htmlFor="confirmNewPassword">{t("confirmNew")}</label>
            <input
              className="form-control"
              type="password"
              name="confirmNewPassword"
              onChange={(e) => handleOnchange(e)}
              value={data?.confirmNewPassword}
              required
            />
          </div>

          <div className="btn_wrapper">
            <button type="submit" className="btn btn-change-password col col-12">
              {t("changePass")}
            </button>
            <button onClick={backPre} type="button" className="btn btn-back btn-outline col col-12">
              {t("back")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordComponent;
