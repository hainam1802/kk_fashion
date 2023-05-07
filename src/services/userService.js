import api from "./api";
const login = (taikhoan, matkhau) => {
  const data = {
    username: taikhoan,
    password: matkhau,
  };

  return api.post(api.url.login, data)
};

const userService = {
  login,
};

export default userService;
