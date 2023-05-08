import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../auth";
import storage from "redux-persist/lib/storage"
import {combineReducers} from "redux";
import {persistReducer,persistStore} from "redux-persist";
import {loadingBarReducer} from "react-redux-loading-bar";

import thunk from "redux-thunk";
import {createStateSyncMiddleware, initMessageListener} from "redux-state-sync/dist/syncState";
import cartReducer from "../cart";

// const store = configureStore({
//     reducer: {
//         auth: authReducer,
//     }
// })
// export default store;
const syncConfig = {
    blacklist: ["persist/PERSIST"]
}
const authPersistConfig = {key: "auth", storage};
const cartPersistConfig = {key: "cart", storage};
const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
    loadingBar: loadingBarReducer
});
const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk,createStateSyncMiddleware(syncConfig)]
});
initMessageListener(store)
export default store;
export const persistStore1 = persistStore(store)