import { useTranslation } from "react-i18next";
import "./InfoMeComponent.scss";
import { useEffect, useState } from "react";
import * as FilmService from "../../services/FilmService";
import { useNavigate } from "react-router-dom";
function InfoMeComponent() {
  let { t } = useTranslation();
  let [category, setCategory] = useState([]);
  let [country, setCountry] = useState([]);
  let navigate = useNavigate();
  const handleGetFooter = async () => {
    let type = await FilmService.getAllTypeFilm();
    let country = await FilmService.getAllCountryFilm();
    if (type.length > 0 && country.length > 0) {
      setCategory(type);
      setCountry(country);
    }
  };

  const handleRedirectFilm = (data, type) => {
    navigate(`/phim/${type}/${data.slug}/1`);
  };
  useEffect(() => {
    handleGetFooter();
  }, []);

  return (
    <div className="info-me-container">
      <div className="row">
        <div className="content-left col col-5">
          <div className="logo"></div>
          <div className="information">
            <span className="info">{t("intro")}</span>
          </div>
        </div>
        <div className="content-right col col-7">
          <div className="category">
            <div className="title">{t("newFilmCategory")}</div>
            <ul className="genres">
              {category &&
                category.length > 0 &&
                category.reverse().map((item, index) => {
                  return (
                    index < 5 && (
                      <li onClick={() => handleRedirectFilm(item, "the-loai")} className="genre-item" key={index}>
                        {item.name}
                      </li>
                    )
                  );
                })}
            </ul>
          </div>
          <div className="category">
            <div className="title">{t("goodFilms")}</div>
            <ul className="genres">
              {country &&
                country.length > 0 &&
                country.reverse().map((item, index) => {
                  return (
                    index < 5 && (
                      <li onClick={() => handleRedirectFilm(item, "quoc-gia")} className="genre-item" key={index}>
                        Phim {item.name}
                      </li>
                    )
                  );
                })}
            </ul>
          </div>
          <div className="category">
            <div className="title">{t("introduction")}</div>
            <ul className="genres">
              <li className="genre-item">{t("introduction")}</li>
              <li className="genre-item">{t("privacyPolicy")}</li>
              <li className="genre-item">{t("copyrightComplaint")}</li>
              <li className="genre-item">{t("termsOfUse")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoMeComponent;
