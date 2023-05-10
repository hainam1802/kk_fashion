import api from "./api";


const get = (category,id) => {
  return api.get(`${api.url.product}/${category}/${id}`)
};
const list = (page,id,title,price) => {
  return api.get(`${api.url.product}?page=${page}&id=${id}&title=${title}&price=${price}`)
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
