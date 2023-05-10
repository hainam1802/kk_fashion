import api from "./api";

const getAds = (id) => {
  return api.get(`${api.url.setting}/get-ads?id=${id}`)
};
const getWidget = (id) => {
  return api.get(`${api.url.setting}/get-widget?id=${id}`)
};

const settingService = {
  getAds,
  getWidget
};

export default settingService;
