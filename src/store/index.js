import {configureStore} from "@reduxjs/toolkit";
import listSlice from "./listSlice";
import boardSlice from "./boardSlice";

const store = configureStore({
reducer:{
    boardSlice:boardSlice
}
})
export default store;