import { persistor } from "./redux/store";

export const isJsonString = (data) => {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  persistor.pause();
  persistor.flush().then(() => {
    return persistor.purge();
  });
};
