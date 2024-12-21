import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as FilmService from "../../services/FilmService.js";
import FilmTypeComponent from "../../components/FilmTypeComponent/FilmTypeComponent.js";
function FilmTypePage() {
  let [dataFilms, setDataFilms] = useState([]);
  let [pageCurrent, setPageCurrent] = useState(1);
  let [pagination, setPagination] = useState();
  let location = useLocation();
  let [options, setOptions] = useState({
    type: "",
    data: "",
  });
  const handleGetDataFilms = async () => {
    let limit = 10;
    if (options && options.data) {
      let res = await FilmService.getTypeFilm(options?.type, options?.data, pageCurrent, limit);

      setPagination(res && res.data.params && res.data.params.pagination);
      if (res.data.items && res.data.items.length > 0) {
        setDataFilms([...res.data.items]);
      }
    }
  };
  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      type: location.pathname.split("/")[2],
      data: location.pathname.split("/")[3],
    }));
    setPageCurrent(location.pathname.split("/")[4]);
  }, [location]);
  useEffect(() => {
    handleGetDataFilms();
  }, [options]);
  return (
    <div className="film-type-page_container">
      <FilmTypeComponent options={options} pageCurrent={pageCurrent} pagination={pagination} data={dataFilms} />
    </div>
  );
}

export default FilmTypePage;
