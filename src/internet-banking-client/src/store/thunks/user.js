import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userApi from "../../apis/user";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (data, { rejectWithValue }) => {
    try {
      const result = await userApi.getAllUsers(data.page, data.size);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await userApi.assignUser(data);
      toast.success("User created");
      dispatch(getUsers(1, 10));
      return result;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);
