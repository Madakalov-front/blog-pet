import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
  "usersSlice/getUsers",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        return thunkAPI.rejectWithValue("Ошибка при загрузке данных");
      }
      return await res.json();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
