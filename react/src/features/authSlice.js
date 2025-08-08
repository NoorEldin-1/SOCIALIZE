import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl, fileUrl } from "../main";

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

export const editAccount = createAsyncThunk(
  "auth/editAccount",
  async (info, { rejectWithValue }) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      };

      let data;
      if (info.profileImage || info.coverImage) {
        const formData = new FormData();

        formData.append("name", info.name);
        formData.append("showLikes", info.showLikes === "true" ? "1" : "0");
        formData.append("showShares", info.showShares === "true" ? "1" : "0");
        formData.append(
          "showFollowers",
          info.showFollowers === "true" ? "1" : "0"
        );
        formData.append(
          "showFollowing",
          info.showFollowing === "true" ? "1" : "0"
        );

        if (info.profileImage) {
          formData.append("profileImage", info.profileImage);
        }
        if (info.coverImage) {
          formData.append("coverImage", info.coverImage);
        }

        data = formData;

        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        data = {
          name: info.name,
          showLikes: info.showLikes === "true" ? "1" : "0",
          showShares: info.showShares === "true" ? "1" : "0",
          showFollowers: info.showFollowers === "true" ? "1" : "0",
          showFollowing: info.showFollowing === "true" ? "1" : "0",
        };
      }

      const res = await axios.post(`${backendUrl}editAccount`, data, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (username) => {
    const res = await axios.get(`${backendUrl}getProfile/${username}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    profile: {},
    token: {},
    signupLoading: "",
    loginLoading: "",
    logoutLoading: "",
    deleteLoading: "",
    editLoading: "",
    signupError: "",
    loginError: "",
    profileLoading: "",
  },
  reducers: {
    reset: (state) => {
      state.user = {};
      state.token = {};
      state.signupError = "";
      state.loginError = "";
      state.signupLoading = "";
      state.loginLoading = "";
      state.logoutLoading = "";
      state.deleteLoading = "";
      state.editLoading = "";
      state.profileLoading = "";
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
          window.localStorage.setItem("userId", action.payload.user.id);
          window.localStorage.setItem(
            "showLikes",
            Boolean(action.payload.user.showLikes)
          );
          window.localStorage.setItem(
            "showShares",
            Boolean(action.payload.user.showShares)
          );
          window.localStorage.setItem(
            "showFollowers",
            Boolean(action.payload.user.showFollowers)
          );
          window.localStorage.setItem(
            "showFollowing",
            Boolean(action.payload.user.showFollowing)
          );

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
          window.localStorage.setItem("userId", action.payload.user.id);
          window.localStorage.setItem(
            "showLikes",
            Boolean(action.payload.user.showLikes)
          );
          window.localStorage.setItem(
            "showShares",
            Boolean(action.payload.user.showShares)
          );
          window.localStorage.setItem(
            "showFollowers",
            Boolean(action.payload.user.showFollowers)
          );
          window.localStorage.setItem(
            "showFollowing",
            Boolean(action.payload.user.showFollowing)
          );

          if (action.payload.user.profileImage) {
            window.localStorage.setItem(
              "profileImage",
              `${fileUrl}${action.payload.user.profileImage}`
            );
          }
          if (action.payload.user.coverImage) {
            window.localStorage.setItem(
              "coverImage",
              `${fileUrl}${action.payload.user.coverImage}`
            );
          }

          window.location.href = "/";
        }
      })
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logout.fulfilled, () => {
        window.localStorage.clear();
        reset();
        window.location.href = "/";
      })
      .addCase(deleteAccount.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteAccount.fulfilled, () => {
        window.localStorage.clear();
        reset();
        window.location.href = "/";
      })
      .addCase(editAccount.pending, (state) => {
        state.editLoading = "true";
      })
      .addCase(editAccount.fulfilled, (state, action) => {
        state.editLoading = "false";

        state.user = action.payload.user;
        window.localStorage.setItem("name", action.payload.user.name);
        window.localStorage.setItem("showLikes", action.payload.user.showLikes);
        window.localStorage.setItem(
          "showShares",
          action.payload.user.showShares
        );
        window.localStorage.setItem(
          "showFollowers",
          action.payload.user.showFollowers
        );
        window.localStorage.setItem(
          "showFollowing",
          action.payload.user.showFollowing
        );

        if (action.payload.user.profileImage) {
          window.localStorage.setItem(
            "profileImage",
            `${fileUrl}${action.payload.user.profileImage}`
          );
        } else {
          window.localStorage.removeItem("profileImage");
        }
        if (action.payload.user.coverImage) {
          window.localStorage.setItem(
            "coverImage",
            `${fileUrl}${action.payload.user.coverImage}`
          );
        } else {
          window.localStorage.removeItem("coverImage");
        }
        window.location.href = "/";
      })
      .addCase(editAccount.rejected, (state, action) => {
        state.editLoading = "false";
        state.editError = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.profileLoading = "true";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profileLoading = "false";

        let profile = action.payload.user;

        if (profile.profileImage) {
          profile.profileImage = `${fileUrl}${profile.profileImage}`;
        }
        if (profile.coverImage) {
          profile.coverImage = `${fileUrl}${profile.coverImage}`;
        }

        state.profile = profile;
      })
      .addCase(getProfile.rejected, () => {
        window.location.href = "/";
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
