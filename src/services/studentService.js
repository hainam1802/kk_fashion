import api from "./api";

const list = () => {
  return api.get(api.url.students)
};

const get = (id) => {
  return api.get(`${api.url.students}/${id}`)
};
const getAvatar = (id) => {
  return api.get(`${api.url.students}/avatar-url/${id}`)
};

const add = (data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key,data[key]);
  return api.post(api.url.students, formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
};

const update = (id, data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key,data[key]);
  return api.put(`${api.url.students}/${id}`, formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
};

const remove = (id) => {
  return api.delete(`${api.url.students}/${id}`)
};

const studentsService = {
  list,
  get,
  add,
  update,
  delete: remove,
  getAvatar
};

export default studentsService;
