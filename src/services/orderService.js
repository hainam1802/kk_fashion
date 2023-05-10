import api from "./api";

const list = () => {
    return api.get(api.url.order)
};

const get = (category,id) => {
    return api.get(`${api.url.order}/${category}/${id}`)
};
const getHistory = (token) => {
    return api.get(`${api.url.order}?token=${token}`)
};

const add = (data) => {
    return api.post(api.url.order, data)
};


const orderService = {
    list,
    get,
    add,
    getHistory
};

export default orderService;
