import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../main";

export const signup = createAsyncThunk("auth/signup", async (info) => {
  try {
    const res = await axios.post(`${backendUrl}signup`, {
      name: info.fullName,
      username: info.username,
      password: info.password,
      confirm_password: info.confirmPassword,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
});

export const login = createAsyncThunk("auth/login", async (info) => {
  try {
    const res = await axios.post(`${backendUrl}login`, {
      username: info.username,
      password: info.password,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.delete(`${backendUrl}logout`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
});

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async () => {
    await axios.delete(`${backendUrl}deleteAccount`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    token: {},
    signupLoading: false,
    loginLoading: false,
    logoutLoading: false,
    deleteLoading: false,
    signupError: "",
    loginError: "",
  },
  reducers: {
    reset: (state) => {
      state.user = {};
      state.token = {};
      state.signupError = "";
      state.loginError = "";
      state.signupLoading = false;
      state.loginLoading = false;
      state.logoutLoading = false;
      state.deleteLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.signupLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signupLoading = false;
        if (action.payload.error) {
          state.signupError = action.payload.error.username[0];
        } else {
          state.user = action.payload.user;
          state.token = action.payload.token;

          window.localStorage.setItem("token", action.payload.token);
          window.localStorage.setItem("name", action.payload.user.name);
          window.localStorage.setItem("username", action.payload.user.username);

          window.location.href = "/";
        }
      })
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        if (action.payload.message) {
          state.loginError = action.payload.message;
        } else {
          state.user = action.payload.user;
          state.token = action.payload.token;

          window.localStorage.setItem("token", action.payload.token);
          window.localStorage.setItem("name", action.payload.user.name);
          window.localStorage.setItem("username", action.payload.user.username);

          window.location.href = "/";
        }
      })
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logout.fulfilled, () => {
        reset();

        window.localStorage.removeItem("token");
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("username");

        window.location.href = "/";
      })
      .addCase(deleteAccount.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteAccount.fulfilled, () => {
        reset();

        window.localStorage.removeItem("token");
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("username");

        window.location.href = "/";
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
