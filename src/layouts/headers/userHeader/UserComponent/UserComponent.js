import { useTranslation } from "react-i18next";
import "./UserComponent.scss";
import * as utils from "../../../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../../../redux/UserSlice/UserSlice";
function UserComponent() {
  let { t } = useTranslation();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  const userOption = (data) => {
    if (data === "profile") navigate("/thong-tin-ca-nhan");
    if (data === "manage") navigate("/quan-ly/nguoi-dung");
  };
  const handleLogout = () => {
    utils.logout();
    dispatch(resetUser());
    navigate("/");
  };

  return (
    <div className="user-component_container">
      <div className="dropdown">
        {user && user?.username !== "" ? (
          <>
            <i id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" className="fa-solid fa-user"></i>
            <ul className="dropdown-menu" aria-labelledby="userDropdown">
               <li className="dropdown-item" onClick={() => userOption("profile")}>
                {t("profile")}
              </li>
              {user && user.isAdmin === true && (
                <li className="dropdown-item" onClick={() => userOption("manage")}>
                  {t("manage")}
                </li>
              )}
              <li className="dropdown-item" onClick={() => handleLogout()}>
                {t("logout")}
              </li>
            </ul>
          </>
        ) : (
          <i onClick={() => navigate("/dang-nhap")} className="fa-solid fa-right-to-bracket"></i>
        )}
      </div>
    </div>
  );
}

export default UserComponent;
