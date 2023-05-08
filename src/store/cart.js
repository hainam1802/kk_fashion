import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        item: null,
    },
    reducers:{
        addcart: (state,action)=>{
            state.item = action.payload.item;
        },
        // logout: (state) => {
        //     state.isLoggedIn = false;
        //     state.token = null;
        //     state.userInfo = {};
        // }
    }
})
export const {addcart} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;