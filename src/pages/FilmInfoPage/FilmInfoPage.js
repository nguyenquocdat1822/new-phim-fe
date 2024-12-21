import { useLocation, useParams } from "react-router-dom";
import FilmInfoPcTablet from "../../components/FilmInfoComponent/PcTablet/FilmInfoPcTablet";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as FilmService from "../../services/FilmService";
import { useEffect, useState } from "react";
import FilmInfoMobile from "../../components/FilmInfoComponent/Mobile/FilmInfoMobile";
import "./FilmInfoPage.scss";
import CommentsPlugin from "../../components/SocialPluginComponent/CommentsPlugin";
import { useTranslation } from "react-i18next";
function FilmInfoPage() {
  let location = useLocation();
  let slugFilm = location.pathname.split("/")[2];
  let mutationGetFilm = useMutationHook((data) => FilmService.getFilmInfo(data));
  let { i18n } = useTranslation();
  let { data } = mutationGetFilm;
  let [filmData, setFilmData] = useState({});
  let [episodes, setEpisodes] = useState({});
  let params = useParams();
  let successUrl = `${location.pathname.split("/").join("/")}/${params?.ten_phim}`;
  // function
  let getInfoFilm = async () => {
    await mutationGetFilm.mutate(slugFilm);
  };
  // useEffect
  useEffect(() => {
    getInfoFilm();
  }, [location]);

  useEffect(() => {
    if (data && data.status) {
      setFilmData(data?.movie);
      setEpisodes(data?.episodes[0]);
    }
  }, [data]);

  return (
    <div className="film-info-container">
      <div className="film-info-pc">
        <FilmInfoPcTablet data={filmData} episodes={episodes} />
      </div>
      <div className="film-info-mobile">
        <FilmInfoMobile data={filmData} episodes={episodes} />
      </div>

      <div className="comment_wrapper container">
        <div className="row">
          <div className="title col col-12">{i18n.language === "en" ? "Comments" : "Bình luận"}</div>
          <div className="col col-12">
            <CommentsPlugin href={successUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmInfoPage;
