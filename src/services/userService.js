import api from "./api";
const login = (taikhoan, matkhau) => {
  const data = {
    username: taikhoan,
    password: matkhau,
  };
  return api.post(api.url.login, data)
};
const register = (taikhoan, matkhau,matkhauxacnhan,email,sodienthoai) => {
  const data = {
    username: taikhoan,
    password: matkhau,
    passwordconfirm: matkhauxacnhan,
    email: email,
    phone: sodienthoai,
  };
  return api.post(api.url.register, data)
};
const userService = {
  login,
  register
};

export default userService;
