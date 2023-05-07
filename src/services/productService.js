import api from "./api";

const list = () => {
  return api.get(api.url.product)
};

const get = (category,id) => {
  return api.get(`${api.url.product}/${category}/${id}`)
};

const add = (data) => {
  return api.post(api.url.product, data)
};


const productService = {
  list,
  get,
  add,
};

export default productService;
