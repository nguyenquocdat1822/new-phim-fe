import { useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import "./AdminComponent.scss";
import { useTranslation } from "react-i18next";
import UserModal from "./UserModal/UserModal";
import { toast } from "react-toastify";
function AdminComponent() {
  let user = useSelector((state) => state.user);
  let [userSelect, setUserSelect] = useState({});
  let { t, i18n } = useTranslation();
  let [listUser, setListUser] = useState([]);
  const handleGetAllUser = async () => {
    let res = await UserService.handleGetAllUser({ id: user?.id, access_token: user?.access_token });

    if (res && res.status === "OK") {
      setListUser([...res.data]);
    }
  };

  useEffect(() => {
    handleGetAllUser();
  }, []);
  console.log(listUser);

  const deleteUser = async (item) => {
    if (
      window.confirm(
        i18n.language === "en"
          ? `Do you want to delete ${item.username} ?`
          : `Bạn có muốn xóa người dùng ${item.username} không?`
      )
    ) {
      let res = await UserService.deleteUser(user, item._id);
      if (res && res.status === "OK") {
        toast.success(i18n.language === "en" ? "Deleted user" : "Đã xóa người dùng");
        handleGetAllUser();
      } else {
        toast.error(i18n.language === "en" ? "Deleted fail, try again!" : "Xóa không thành công!");
      }
    }
  };
  return (
    <div className="admin-component_container">
      <div className="container">
        <div className="row">
          <UserModal data={userSelect} handleGetAllUser={handleGetAllUser} />

          <div className="title col col-12">{t("userManage")}</div>
          <div className="table_wrapper col col-12">
            <table className="table table-hover">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th scope="col">#</th>
                  <th scope="col">{t("displayName")}</th>
                  <th scope="col">{t("role")}</th>
                  <th scope="col">{t("action")}</th>
                </tr>
              </thead>
              <tbody>
                {listUser &&
                  listUser.length > 0 &&
                  listUser.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td className="username">{item.displayName}</td>
                        <td>{item.isAdmin === true ? t("role") : t("user")}</td>
                        <td className="action_wrapper">
                          <button onClick={() => deleteUser(item)} type="button" className="btn btn-danger">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#userModal"
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => setUserSelect(item)}
                          >
                            <i className="fa-solid fa-circle-info"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminComponent;
