import AdminPage from "../pages/AdminPage/AdminPage";
import FilmAnimePage from "../pages/FIlmAnimePage/FilmAnimePage";
import FilmInfoPage from "../pages/FilmInfoPage/FilmInfoPage";
import FilmMoviePage from "../pages/FilmMoviePage/FilmMoviePage";
import FilmSeriesPage from "../pages/FilmSeriesPage/FilmSeriesPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SIgnInPage from "../pages/SIgnInPage/SIgnInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import WatchFilmPage from "../pages/WatchFilmPage/WatchFilmPage";
import ChangePasswordPage from "../pages/ChangePasswordPage/ChangePasswordPage";
import FilmTypePage from "../pages/FilmTypePage/FilmTypePage";
export let routes = [
  {
    path: "/",
    page: HomePage,
    layout: "l1",
    isLogin: false,
  },
  {
    path: "/:loai-phim/:ten_phim",
    page: FilmInfoPage,
    layout: "l1",
    isLogin: false,
  },
  {
    path: "/xem-phim/:ten-phim/:tap",
    page: WatchFilmPage,
    layout: "l1",
    isLogin: false,
  },
  {
    path: "/phim-bo/trang/:so-trang",
    page: FilmSeriesPage,
    layout: "l1",
    isLogin: false,
  },
  {
    path: "/phim-le/trang/:so-trang",
    page: FilmMoviePage,
    layout: "l1",
    isLogin: false,
  },
  {
    path: "/hoat-hinh/trang/:so-trang",
    page: FilmAnimePage,
    layout: "l1",
    isLogin: false,
  },
  {
    path: "/phim/:type/:data/:so-trang",
    page: FilmTypePage,
    layout: "l1",
    isLogin: false,
  },

  {
    path: "/dang-nhap",
    page: SIgnInPage,
    layout: "l2",
    isLogin: false,
  },
  {
    path: "/dang-ky",
    page: SignUpPage,
    layout: "l2",
    isLogin: false,
  },
  {
    path: "/thong-tin-ca-nhan",
    page: ProfilePage,
    layout: "l1",
    isLogin: true,
  },
  {
    path: "/thong-tin-ca-nhan/doi-mat-khau",
    page: ChangePasswordPage,
    layout: "l2",
    isLogin: true,
  },
  {
    path: "/quan-ly/nguoi-dung",
    page: AdminPage,
    layout: "l2",
    isAdmin: true,
    isLogin: true,
  },
  {
    path: "*",
    page: NotFoundPage,
    layout: "l1",
    isLogin: false,
  },
];
