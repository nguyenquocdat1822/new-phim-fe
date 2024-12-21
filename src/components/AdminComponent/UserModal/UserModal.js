import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as UserService from "../../../services/UserService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function UserModal(props) {
  let admin = useSelector((state) => state.user);
  let [user, setUser] = useState({});
  let { t, i18n } = useTranslation();
  useEffect(() => {
    if (props && props?.data && props?.data?.username !== "") {
      setUser({ ...props?.data });
    }
  }, [props?.data]);

  const handleOnchange = (e) => {
    let copyState = { ...user };
    copyState[e.target.name] = e.target.value;
    setUser({
      ...copyState,
    });
  };
  const updateUser = async () => {
    let res = await UserService.updateUserAdmin(admin, user);
    console.log(res);

    if (res && res.status === "OK") {
      toast.success(t(i18n.language === "en" ? res.message.en : res.message.vi));
      props.handleGetAllUser();
    } else {
      toast.error(t(i18n.language === "en" ? res.message.en : res.message.vi));
    }
  };
  return (
    <div className="user-modal_container">
      <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userModalLabel">
                {t("profile")}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row" style={{ color: "#000" }}>
                <div className="form-group col col-12">
                  <label htmlFor="displayName">{t("displayName")}</label>
                  <input
                    onChange={(e) => handleOnchange(e)}
                    className="form-control"
                    type="text"
                    name="displayName"
                    value={user?.displayName}
                  />
                </div>

                <div className="form-group col col-12">
                  <label htmlFor="address">{t("address")}</label>
                  <input
                    onChange={(e) => handleOnchange(e)}
                    className="form-control"
                    type="text"
                    name="address"
                    value={user?.address}
                  />
                </div>

                <div className="form-group col col-12">
                  <label htmlFor="phoneNumber">{t("phoneNumber")}</label>
                  <input
                    onChange={(e) => handleOnchange(e)}
                    className="form-control"
                    type="text"
                    name="phoneNumber"
                    value={user?.phoneNumber}
                  />
                </div>
                <div className="form-group col col-12">
                  <label>{t("userRole")}</label>
                  <select
                    className="form-select"
                    value={user?.isAdmin}
                    name="isAdmin"
                    onChange={(e) => handleOnchange(e)}
                    aria-label="Default select example"
                  >
                    <option value={true}>{t("role")}</option>
                    <option value={false}>{t("user")}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                {t("close")}
              </button>
              <button onClick={() => updateUser()} type="button" data-bs-dismiss="modal" className="btn btn-primary">
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
