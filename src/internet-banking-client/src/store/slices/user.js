import { createSlice } from "@reduxjs/toolkit";
import { getUsers, createUser } from "../thunks/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {},
    fetchLoading: false,
    modifyLoading: false,
    fetchError: "",
    modifyError: "",
  },
  extraReducers: {
    // ACTION TYPE: Get all companis
    // [getUsers.pending]: (state) => {
    //   state.fetchLoading = true;
    // },
    // [getUsers.fulfilled]: (state, { payload }) => {
    //   state.fetchLoading = false;
    //   state.users = payload;
    //   state.fetchError = "";
    // },
    // [getUsers.rejected]: (state, { payload }) => {
    //   state.fetchLoading = false;
    //   state.error = payload;
    // },
    //ACTION TYPE: Create new company
    // [createUser.pending]: (state) => {
    //   state.modifyLoading = true;
    // },
    // [createUser.fulfilled]: (state) => {
    //   state.modifyLoading = false;
    //   state.modifyError = "";
    // },
    // [createUser.rejected]: (state, { payload }) => {
    //   state.modifyLoading = false;
    //   state.modifyError = payload;
    // },
  },
});
export default userSlice.reducer;
