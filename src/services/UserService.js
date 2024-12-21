import axios from "axios";
export const axiosJWT = axios.create();

export const signIn = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_BACK_END}user/sign-in`, data);
  return res.data;
};

export const signUn = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_BACK_END}user/sign-up`, data); //req.body
  return res.data;
};

export const getDetailUser = async (data) => {
  let res = await axios.get(`${process.env.REACT_APP_API_BACK_END}user/get-user`, {
    headers: {
      id: data?.id,
      token: `Bearer ${data?.access_token}`, //req.headers
    },
  });
  return res.data;
};

export const refreshToken = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_BACK_END}user/refresh-token`, {
    headers: {
      id: data.id,
      token: `Bearer ${data.access_token}`,
    },
  });
  return res.data;
};

export const updateUser = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_BACK_END}user/update-user`, data, {
    headers: {
      id: data.id,
      token: `Bearer ${data.access_token}`,
    },
  });

  return res.data;
};

export const saveFilm = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_BACK_END}user/save-history`, data.dataFilm, {
    headers: {
      id: data.id,
      token: `Bearer ${data.access_token}`,
    },
  });

  return res.data;
};

export const handleGetAllUser = async (data) => {
  let res = await axios.get(`${process.env.REACT_APP_API_BACK_END}user/get-all-user`, {
    headers: {
      id: data.id,
      token: `Bearer ${data.access_token}`,
    },
  });
  return res.data;
};

export const deleteUser = async (data, deleteId) => {
  let res = await axios.post(
    `${process.env.REACT_APP_API_BACK_END}user/delete-user`,
    { id: deleteId },
    {
      headers: {
        id: data.id,
        token: `Bearer ${data.access_token}`,
      },
    }
  );

  return res.data;
};

export const updateUserAdmin = async (admin, data) => {
  // console.log(data);

  // return;
  let res = await axios.post(`${process.env.REACT_APP_API_BACK_END}user/update-user-admin`, data, {
    headers: {
      id: admin.id,
      token: `Bearer ${admin.access_token}`,
    },
  });

  return res.data;
};

export const changePassword = async (user, data) => {
  let res = await axios.post(
    `${process.env.REACT_APP_API_BACK_END}user/change-password`,
    { ...data, username: user.username },
    {
      headers: {
        id: user.id,
        token: `Bearer ${user.access_token}`,
      },
    }
  );
  return res.data;
};

export const toggleLikeFilm = async (user, dataFilm) => {
  let res = await axios.post(`${process.env.REACT_APP_API_BACK_END}user/toggle-like-film`, dataFilm, {
    headers: {
      token: `Bearer ${user.access_token}`,
      id: user.id,
    },
  });
  return res.data;
};
