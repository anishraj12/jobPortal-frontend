import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";
const jwtSlice = createSlice({
  name: "jwt",
  initialState: localStorage.getItem("token") || "",
  reducers: {
    setJwt: (state, action) => {
      localStorage.setItem("token", action.payload);
      state = getItem("jwt");
      return state;
    },
    removejwt: (state) => {
      localStorage.removeItem("token");
      state = "";
      return state;
    },
  },
});

export const { setJwt, removejwt } = jwtSlice.actions;
export default jwtSlice.reducer;
