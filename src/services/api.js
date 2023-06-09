import axios from "axios";
import store from "./../store/reducers/index"
import {hideLoading, showLoading} from "react-redux-loading-bar";

const url = {
    baseUrl: "https://shop.decor.tichhop.pro/api/client",
    login: "/login",
    register: "/register",
    product: "/product",
    category: "/category",
    order: "/order",
    profile: "/profile",
    setting: "/setting",
    menu: "/menu-category",
    blog: "/blog",


};

const instance = axios.create({
    baseURL: url.baseUrl,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

instance.interceptors.request.use((request) =>{
        const state = store.getState();
        if (state.auth.token){
            request.headers.Authorization =  `Bearer ${state.auth.token}`
        }
        store.dispatch(showLoading())
        return request;
    }
);

instance.interceptors.response.use(

    (response) =>{
        setTimeout(()=>store.dispatch(hideLoading()),100);
        return response.data
    } , // thanh cong

    (err) => { // loi
        setTimeout(()=>store.dispatch(hideLoading()),100)

        if (err.code === "ERR_NETWORK") { // loi do nha mang
            window.location.href = "/network-error"; // quay ve trang trang network error
        } else {
            switch (err.response.status) {
                case 401:
                    window.location.href = "/login";
                    break;
                case 403:
                    window.location.href = "/no-permission";
                    break;
                default:

                    break;
            }
        }
        return Promise.reject(err);
    }
);

const api = {
    url,
    instance,
    get: instance.get,
    getHistory: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
    patch: instance.patch,
};

export default api;
