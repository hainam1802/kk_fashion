import api from "./api";

const getIndex = () => {
  return api.get(`${api.url.blog}`)
};
const get = (category,id) => {
  return api.get(`${api.url.product}/${category}/${id}`)
};
const list = (category,page) => {
  return api.get(`${api.url.blog}/${category}?page=${page}`)
};


const add = (data) => {
  return api.post(api.url.product, data)
};


const blogService = {
  list,
  get,
  add,
  getIndex
};

export default blogService;
