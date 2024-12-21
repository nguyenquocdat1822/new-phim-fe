import { useEffect, useState } from "react";
import "./ProfileComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/UserSlice/UserSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DotComponent from "../LoadingComponent/DotLoading";
import DotLoading from "../LoadingComponent/DotLoading";
function ProfileComponent() {
  let user = useSelector((state) => state.user);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { t, i18n } = useTranslation();

  let [userInfo, setUserInfo] = useState({
    id: "",
    username: "",
    displayName: "",
    phoneNumber: "",
    filmHistory: [],
    filmsFavorite: [],
    address: "",
  });

  let mutation = useMutationHook((data) => UserService.updateUser(data));
  let { data } = mutation;

  // useEffect
  useEffect(() => {
    if (user && user?.username) {
      setUserInfo({
        id: user?.id,
        username: user?.username,
        displayName: user?.displayName,
        phoneNumber: user?.phoneNumber,
        filmHistory: user?.filmHistory,
        filmsFavorite: user?.filmsFavorite,
        address: user?.address,
      });
    }
  }, [user]);
  useEffect(() => {
    if (user && user?.username) {
      setUserInfo({
        id: user?.id,
        username: user?.username,
        displayName: user?.displayName,
        phoneNumber: user?.phoneNumber,
        filmHistory: user?.filmHistory,
        filmsFavorite: user?.filmsFavorite,
        address: user?.address,
      });
    }
  }, [user]);

  useEffect(() => {
    if (data && data?.status === "OK") {
      setUserInfo({
        id: data?.data?.id,
        username: data?.data?.username,
        displayName: data?.data?.displayName,
        phoneNumber: data?.data?.phoneNumber,
        filmHistory: data?.data?.filmHistory,
        address: data?.data?.address,
      });
      toast.success(t("saveSuccess"));
      dispatch(updateUser({ ...data?.data }));
    }
  }, [data]);
  //   function
  const handleOnchange = (e) => {
    let copyState = { ...userInfo };
    copyState[e.target.name] = e.target.value;
    setUserInfo({
      ...copyState,
    });
  };

  const handleUpdateUser = async () => {
    await mutation.mutate(userInfo);
  };
  const watchFilmInfo = (data) => {
    // let episode = data?.filmEp > 9 ? `tap-${data?.filmEp}` : `tap-0${data?.filmEp}`;
    navigate(`/${data.type}/${data?.slug}`);
  };
  const watchFilm = (data) => {
    let episode = data?.filmEp > 9 ? `tap-${data?.filmEp}` : `tap-0${data?.filmEp}`;
    navigate(`/xem-phim/${data?.slug}/${data?.filmEp ? episode : "full"}`);
  };

  return (
    <div className="profile-component_container">
      <div className="container">
        <div className="row">
          <div className="title col col-12">{t("profile")}</div>
          <div className="form-info_wrapper col col-12">
            <div className="row">
              {userInfo && userInfo?.username ? (
                <>
                  {" "}
                  <div className="form-group col col-12">
                    <label htmlFor="username">{t("username")}</label>
                    <input
                      style={{ cursor: "not-allowed" }}
                      disabled
                      type="text"
                      name="username"
                      value={userInfo.username}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col col-12">
                    <label htmlFor="displayName">{t("displayName")}</label>
                    <input
                      onChange={(e) => handleOnchange(e)}
                      type="text"
                      name="displayName"
                      value={userInfo.displayName}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col col-6">
                    <label htmlFor="phoneNumber">{t("phoneNumber")}</label>
                    <input
                      onChange={(e) => handleOnchange(e)}
                      type="text"
                      name="phoneNumber"
                      value={userInfo.phoneNumber}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col col-6">
                    <label htmlFor="address">{t("address")}</label>
                    <input
                      onChange={(e) => handleOnchange(e)}
                      type="text"
                      name="address"
                      value={userInfo.address}
                      className="form-control"
                    />
                  </div>
                  <div className="change-password_wrapper col col-12">
                    <div className="text" onClick={() => navigate("/thong-tin-ca-nhan/doi-mat-khau")}>
                      {t("changePass")}
                    </div>
                  </div>
                  <div className="button_wrapper col col-12">
                    <button onClick={() => handleUpdateUser()} className="btn btn_save" type="button">
                      {t("save")}
                    </button>
                  </div>
                </>
              ) : (
                <DotLoading />
              )}
            </div>
          </div>
          <div className="history_wrapper col col-12">
            <div className="title_history">{t("recentlyView")}</div>
            <div className="history-list">
              <div className="row">
                {userInfo && userInfo?.filmHistory?.length > 0 ? (
                  userInfo?.filmHistory
                    ?.slice()
                    .reverse()
                    .map((item, index) => {
                      return (
                        <div key={index} onClick={() => watchFilm(item)} className="film-history_item col col-12">
                          <div className="image_wrapper">
                            <div className="image" style={{ backgroundImage: `url(${item && item?.thumb_url})` }}></div>
                          </div>
                          <div className="info">
                            <div className="name">
                              {i18n.language === "en" ? item?.filmName_origin : item?.filmName}
                            </div>
                            <div className="episode">{`${t("episode")} ${
                              item && item?.filmEp ? item?.filmEp : "Full"
                            }`}</div>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div className="no-data">{i18n.language === "en" ? "History empty!" : "Chưa có lịch sử xem"}</div>
                )}
              </div>
            </div>
          </div>

          <div className="history_wrapper favorite_wrapper col col-12">
            <div className="title_history">{i18n.language === "en" ? "Favorite films" : "Phim theo dõi"}</div>
            <div className="history-list">
              <div className="row">
                {userInfo && userInfo?.filmsFavorite?.length > 0 ? (
                  userInfo?.filmsFavorite?.map((item, index) => {
                    return (
                      <div key={index} onClick={() => watchFilmInfo(item)} className="film-history_item col col-12">
                        <div className="image_wrapper">
                          <div className="image" style={{ backgroundImage: `url(${item && item?.thumb_url})` }}></div>
                        </div>
                        <div className="info">
                          <div className="name">{i18n.language === "en" ? item?.filmName_origin : item?.filmName}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-data">
                    {i18n.language === "en"
                      ? "List of movies to watch is empty!"
                      : "Chưa có phim trong danh sách theo dõi"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
