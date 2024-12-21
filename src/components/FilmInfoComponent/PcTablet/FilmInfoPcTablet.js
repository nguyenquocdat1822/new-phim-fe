import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteFilm } from "../../../redux/UserSlice/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import * as UserService from "../../../services/UserService";
import ListEpisodePcTablets from "../../listEpisodeComponent/PcTablet/ListEpisodePcTablet";
import DotLoading from "../../LoadingComponent/DotLoading";
import "./FilmInfoPcTablet.scss";
import { toast } from "react-toastify";

function FilmInfoPcTablet(props) {
  let [data, setData] = useState({});
  let [episodes, setEpisodes] = useState({});
  let [userListFilm, setUserListFilm] = useState([]);
  let { t, i18n } = useTranslation();
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  const checkFilm = (slug, filmsFavorite) => {
    if (user && user.username === "") return false;
    if (user && user.username !== "" && filmsFavorite.length < 1) {
      return false;
    }
    if (slug && user && user.username && filmsFavorite.length > 0) {
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
        toast.success(i18n === "en" ? "Remove film to list of movies to watch" : "Bỏ phim khỏi danh sách theo dõi!");
        dispatch(toggleFavoriteFilm({ filmData: filmData }));
      }
      if (res && res.status === "ERROR") {
        toast.error(i18n === "en" ? "Add film is fail, try again!" : "Thêm thất bại, thử lại!");
      }
    }
  };

  const watchFilm = () => {
    let ep = data && data?.type && data?.type === "single" ? "full" : "tap-01";
    navigate(`/xem-phim/${data?.slug}/${ep}`);
    // console.log(data);
  };

  useEffect(() => {
    if (props?.data?.name) setData(props.data);
    if (props?.episodes) setEpisodes(props?.episodes);
  }, [props.data]);

  useEffect(() => {
    if (user && user.filmsFavorite) {
      setUserListFilm([...user.filmsFavorite]);
    }
  }, [user]);

  return (
    <div className="film-info-pc_container">
      <div className="container">
        <div className="row">
          <div className="film-name col col-12">{i18n.language === "en" ? data?.origin_name : data?.name}</div>
          <div className="film-info_wrapper col col-12">
            <div className="row">
              <div className="film_poster col-4">
                {data && data?.poster_url ? (
                  <div className="image" style={{ backgroundImage: `url(${data && data?.poster_url})` }}></div>
                ) : (
                  <DotLoading />
                )}
              </div>
              <div className="film_info col-8">
                {data && data?.origin_name ? (
                  <>
                    <div className="film_info-item">
                      <div className="item_title">{t("originName")}</div>
                      <div className="item_info">{data?.origin_name}</div>
                    </div>
                    <div className="film_info-item">
                      <div className="item_title">{t("filmCategory")}</div>
                      <div className="item_info">
                        {data &&
                          data?.category &&
                          data?.category.length > 0 &&
                          data?.category.map((item, index) => {
                            return <span key={index}>{item.name}, </span>;
                          })}
                      </div>
                    </div>
                    <div className="film_info-item">
                      <div className="item_title">{t("filmStatus")}</div>
                      <div className="item_info" style={{ textTransform: "uppercase" }}>
                        {data?.status === "completed" ? t("filmCompleted") : t("filmGoingOn")}
                      </div>
                    </div>
                    <div className="film_info-item">
                      <div className="item_title">{t("yearRelease")}</div>
                      <div className="item_info">{data?.year}</div>
                    </div>
                    <div className="film_info-item">
                      <div className="item_title">{t("time")}</div>
                      <div className="item_info">
                        {data?.episode_total} {t("episode")}
                      </div>
                    </div>
                  </>
                ) : (
                  <DotLoading />
                )}
              </div>
            </div>
          </div>
          <div className="film-play_buttons col col-12">
            <button type="button" className="btn play_button" onClick={() => watchFilm()}>
              <i className="fa-regular fa-circle-play"></i>
            </button>
            {checkFilm(data.slug, userListFilm) === false ? (
              <button type="button" onClick={() => toggleLikeFilm()} className="btn play_button btn_like">
                <i className="bi bi-bookmark-plus-fill"></i>
              </button>
            ) : (
              <button type="button" onClick={() => toggleLikeFilm()} className="btn play_button btn_unlike">
                <i className="bi bi-bookmark-dash-fill"></i>
              </button>
            )}
          </div>
          <div className="episode-desc_content col col-12">
            <div className="row">
              <div className="list-episodes">
                <div className="list-episodes_title">{t("listEp")}</div>
                <div className="list-episodes_wrapper">
                  {data && data?.slug ? (
                    <ListEpisodePcTablets slug={data?.slug} episodes={episodes?.server_data} />
                  ) : (
                    <DotLoading />
                  )}
                </div>
              </div>

              <div className="description">
                <div className="title">{t("filmDesc")}</div>
                <div className="film_desc">{data?.content ? data?.content : <DotLoading />}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmInfoPcTablet;
