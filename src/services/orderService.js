import api from "./api";

const list = () => {
    return api.get(api.url.order)
};

const get = (category,id) => {
    return api.get(`${api.url.order}/${category}/${id}`)
};

const add = (data) => {
    return api.post(api.url.order, data)
};


const orderService = {
    list,
    get,
    add,
};

export default orderService;
