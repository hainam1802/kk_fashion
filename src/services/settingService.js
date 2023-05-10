import api from "./api";

const getAds = (id) => {
  return api.get(`${api.url.setting}/get-ads?id=${id}`)
};
const getWidget = (id) => {
  return api.get(`${api.url.setting}/get-widget?id=${id}`)
};

const getMenu = (id) => {
  return api.get(`${api.url.menu}`)
};

const settingService = {
  getAds,
  getWidget,
  getMenu
};

export default settingService;
