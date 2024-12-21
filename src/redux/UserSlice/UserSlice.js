import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  displayName: "",
  phoneNumber: "",
  isAdmin: false,
  access_token: "",
  refresh_token: "",
  filmHistory: [],
  filmsFavorite: [],
  address: "",
};
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        _id = "",
        username = "",
        displayName = "",
        phoneNumber = "",
        isAdmin = false,
        access_token = "",
        refresh_token = "",
        filmHistory = [],
        filmsFavorite = [],
        address = "",
      } = action.payload;

      state.id = _id ? _id : state.id;
      state.username = username ? username : state.username;
      state.displayName = displayName ? displayName : state.displayName;
      state.phoneNumber = phoneNumber ? phoneNumber : state.phoneNumber;
      state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
      state.access_token = access_token ? access_token : state.access_token;
      state.refresh_token = refresh_token ? refresh_token : state.refresh_token;
      state.filmHistory = filmHistory ? filmHistory : state.filmHistory;
      state.filmsFavorite = filmsFavorite ? filmsFavorite : state.filmsFavorite;
      state.address = address ? address : state.address;
    },
    resetUser: (state) => {
      state.id = "";
      state.username = "";
      state.displayName = "";
      state.phoneNumber = "";
      state.isAdmin = false;
      state.access_token = "";
      state.refresh_token = "";
      state.filmHistory = [];
      state.filmsFavorite = [];
      state.address = "";
    },
    saveHistoryWatch: (state, action) => {
      const { dataFilm } = action.payload;

      let filmExists = dataFilm.filmEp // thám tư lừng danh => slug = tham-tu-lung-dạnh
        ? state.filmHistory.some((item) => item?.slug === dataFilm?.slug && item?.filmEp === dataFilm?.filmEp)
        : state.filmHistory.some((item) => item?.slug === dataFilm?.slug);

      if (filmExists === false) {
        state.filmHistory.push(dataFilm);
      }
      if (state.filmHistory.length > 3) {
        state.filmHistory = state.filmHistory.slice(state.filmHistory.length - 3);
      }
    },
    toggleFavoriteFilm: (state, action) => {
      const { filmData } = action.  payload;

      // Kiểm tra xem phim đã có trong danh sách yêu thích chưa
      const filmExists = state.filmsFavorite.some((item) => item.slug === filmData.slug);

      if (filmExists) {
        // Nếu đã có, thì bỏ thích (xóa khỏi danh sách)
        state.filmsFavorite = state.filmsFavorite.filter((favoriteFilm) => favoriteFilm.slug !== filmData.slug);
      } else {
        // Nếu chưa có, thì thêm vào danh sách
        state.filmsFavorite.push(filmData);

        // Giới hạn danh sách yêu thích không vượt quá 3 bộ phim
        if (state.filmsFavorite.length > 3) {
          state.filmsFavorite = state.filmsFavorite.slice(state.filmsFavorite.length - 3);
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser, toggleFavoriteFilm, saveHistoryWatch } = UserSlice.actions;

export default UserSlice.reducer;
