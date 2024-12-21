import { useNavigate } from "react-router-dom";
import "./AdminHeader.scss";
import DarkMode from "../../../themes/DarkMode";
import { useTranslation } from "react-i18next";
import LanguageComponent from "../../../components/LanguageComponent/LanguageComponent";
function AdminHeader() {
  let navigate = useNavigate();
  let { t } = useTranslation();
  return (
    <div className="admin-header_container">
      <div className="admin-header_wrapper">
        <div className="button_wrapper">
          <ul>
            <li onClick={() => navigate("/")}>
              <i className="fa-solid fa-house"></i>
              <div className="text">{t("homePage")}</div>
            </li>
            <li onClick={() => navigate("/thong-tin-ca-nhan")}>
              <i className="fa-solid fa-user"></i>
              <div className="text">{t("profile")}</div>
            </li>
          </ul>
        </div>
        <div className="title">{t("manage")}</div>
        <div className="options">
          <LanguageComponent />
          <DarkMode />
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
