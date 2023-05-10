import api from "./api";



const list = (category,page,id,title,price) => {
  return api.get(`${api.url.category}/${category}?page=${page}&id=${id}&title=${title}&price=${price}`)
};

const categoryService = {
  list,
};

export default categoryService;
