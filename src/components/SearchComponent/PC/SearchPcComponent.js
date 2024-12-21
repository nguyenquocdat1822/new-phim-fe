import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../../hooks/useDebounceHook";
import * as FilmService from "../../../services/FilmService";
import "./SearchPcComponent.scss";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchItemComponent from "../../SearchItemComponent/SearchItemComponent";
import SpeechComponent from "../../SpeechComponent/SpeechComponent";
function SearchPcComponent() {
  let { t } = useTranslation();
  let [searchInput, setSearchInput] = useState("");
  let [searchData, setSearchData] = useState([]);
  let [linkImage, setLinkImage] = useState("");
  let [isOpenSpeech, setIsOpenSpeech] = useState(false);

  let searchDebounce = useDebounce(searchInput, 500); // tránh việc gọi api tương ứng vói mỗi lần gõ phím
  // chỉ gọi API search sau 0.5s khi ngừng gõ
  const handleChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleGetFilmSearch = async (context) => {
    const limit = context && context.queryKey && context.queryKey[1]; // mảng index: 0 1 2 ,...
    const search = context && context.queryKey && context.queryKey[2];
    
    let res = await FilmService.searchFilm(search, limit); //gọi tới API thông qua service
    return res;
  };
  const {data}= useQuery({
    queryKey: ["film", 10, searchDebounce],
    queryFn: handleGetFilmSearch,
    retry: 3,
    retryDelay: 1000,
    //giữ cái dâta trước  đó nếu có
    keepPreviousData: true, // khi mình tạo thêm 1 trang tìm kiếm
  });
  // useEffect
  useEffect(() => {
    if (data && data?.status === "success") {
      setSearchData([...data?.data?.items]);
      setLinkImage(data?.data?.APP_DOMAIN_CDN_IMAGE);
    }
  }, [data]);

  return (
    <div className="search-container">
      {isOpenSpeech && (
        <SpeechComponent
          setSearchInput={setSearchInput}
          isOpenSpeech={isOpenSpeech}
          setIsOpenSpeech={setIsOpenSpeech}
        />
      )}

      <div className="search-input">
        <input
          onChange={(e) => handleChangeSearch(e)}
          className="search"
          type="text"
          placeholder={t("search")}
          value={searchInput}
          name="search"
        />
        <button className="search-button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button onClick={() => setIsOpenSpeech(true)} className="search-button">
          <i className="fa-solid fa-microphone"></i>
        </button>
        <div style={{ display: `${searchDebounce !== "" ? "block" : "none"}` }} className="result_container">
          {searchData &&
            searchData?.length > 0 &&
            searchData?.map((item, index) => {
              return (
                <div className="search-item_info" key={index}>
                  <SearchItemComponent setSearchInputPC={setSearchInput} filmItem={item} linkImage={linkImage} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SearchPcComponent;
