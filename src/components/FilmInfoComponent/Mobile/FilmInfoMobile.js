import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DotLoading from "../../LoadingComponent/DotLoading";
import "./FilmInfoMobile.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toggleFavoriteFilm } from "../../../redux/UserSlice/UserSlice";
import * as UserService from "../../../services/UserService";
function FilmInfoMobile(props) {
  let [data, setData] = useState({});
  let [episodes, setEpisodes] = useState({});
  let [userListFilm, setUserListFilm] = useState({});
  let { t, i18n } = useTranslation();
  let user = useSelector((state) => state.user);
  let navigate = useNavigate();
  let location = useLocation();
  let dispatch = useDispatch();

  // function
  const watchFilm = (item) => {
    navigate(`/xem-phim/${data?.slug}/${item?.slug}`);
  };

  const checkFilm = (slug, filmsFavorite) => {
    if (user && user.username === "") return false;

    if (user && user.username && filmsFavorite.length < 1) {
      return true;
    }
    if (slug && filmsFavorite.length > 0) {
      return filmsFavorite.some((item) => item.slug === slug);
    }
    return false;
  };

  const toggleLikeFilm = async () => {
    if (user && user.username === "") {
      navigate("/dang-nhap", { state: location.pathname });
    } else {
      let filmData = {
        slug: data && data?.slug,
        filmName: data && data?.name,
        filmName_origin: data?.origin_name,
        poster_url: data && data?.poster_url,
        thumb_url: data && data?.thumb_url,
        type: data && data.type,
      };
      let res = await UserService.toggleLikeFilm(user, filmData);
      if (res && res.status === "LIKE") {
        toast.success(i18n === "en" ? "Film was added!" : "Đã thêm phim!");
        dispatch(toggleFavoriteFilm({ filmData: filmData }));
      }
      if (res && res.status === "UNLIKE") {
        toast.success(i18n === "en" ? "Remove film to bookmark" : "Bỏ phim khỏi danh sách theo dõi!");
        dispatch(toggleFavoriteFilm({ filmData: filmData }));
      }
      if (res && res.status === "ERROR") {
        toast.error(i18n === "en" ? "Add film is fail, try again!" : "Thêm thất bại, thử lại!");
      }
    }
  };

  const watchFilmButton = () => {
    let ep = data && data?.type && data?.type === "single" ? "full" : "tap-01";
    navigate(`/xem-phim/${data?.slug}/${ep}`);
    // console.log(data);
  };

  useEffect(() => {
    if (props?.data?.name !== "") setData(props?.data);
    if (props?.episodes && props?.episodes?.server_data && props?.episodes?.server_data?.length > 0)
      setEpisodes(props?.episodes?.server_data);
  }, [props.data]);
  useEffect(() => {
    if (user && user.filmsFavorite) {
      setUserListFilm([...user.filmsFavorite]);
    }
  }, [user]);

  return (
    <div className="film-info-mobile_container">
      <div className="container">
        <div className="row">
          <div className="film-name col col-12">{i18n.language === "en" ? data?.origin_name : data?.name}</div>
          <div className="film-info_wrapper col col-12">
            <div className="wrapper_poster">
              {data && data?.thumb_url ? (
                <div className="image" style={{ backgroundImage: `url(${data?.thumb_url})` }}></div>
              ) : (
                <DotLoading />
              )}
            </div>
            <div className="wrapper_info">
              {data && data?.origin_name ? (
                <>
                  <div className="wrapper_info-item">{data?.origin_name}</div>
                  <div className="wrapper_info-item">
                    {data &&
                      data?.category &&
                      data?.category.length > 0 &&
                      data?.category.map((item, index) => {
                        return <span key={index}>{item.name}, </span>;
                      })}
                  </div>
                  <div className="wrapper_info-item">
                    {data?.status === "completed" ? t("filmCompleted") : t("filmGoingOn")}
                  </div>
                  <div className="wrapper_info-item">{data?.year}</div>
                  <div className="wrapper_info-item">
                    {data?.episode_total} {t("episode")}
                  </div>
                </>
              ) : (
                <DotLoading />
              )}
            </div>
          </div>
          <div className="film-button_wrapper col col-12">
            <div className="buttons">
              <button type="button" onClick={() => watchFilmButton()} className="btn film-play_button">
                <i className="fa-solid fa-play"></i>
              </button>
              {checkFilm(data.slug, userListFilm) === false ? (
                <button type="button" onClick={() => toggleLikeFilm()} className="btn film-play_button btn_like">
                  <i className="bi bi-bookmark-plus-fill"></i>
                </button>
              ) : (
                <button type="button" onClick={() => toggleLikeFilm()} className="btn film-play_button btn_unlike">
                  <i className="bi bi-bookmark-dash-fill"></i>
                </button>
              )}
            </div>
          </div>

          <div className="film-episode col col-12">
            <div className="wrapper">
              <div className="title">{t("listEp")}</div>
              <div className="episodes">
                {episodes && episodes?.length > 0 ? (
                  episodes?.map((item, index) => {
                    return (
                      <button onClick={() => watchFilm(item)} key={index} type="button" className="btn episode_button">
                        {index + 1}
                      </button>
                    );
                  })
                ) : (
                  <DotLoading />
                )}
              </div>
            </div>
          </div>
          <div className="film-desc col col-12">
            <div className="wrapper">
              <div className="title">{t("filmDesc")}</div>
              <div className="desc">{data?.content ? data?.content : <DotLoading />}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmInfoMobile;
