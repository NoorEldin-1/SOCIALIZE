import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl, fileUrl } from "../main";

let followTimeout;
export const follow = createAsyncThunk("follow/follow", async ({ info }) => {
  console.log(info);

  if (followTimeout) {
    clearTimeout(followTimeout);
  }

  followTimeout = setTimeout(async () => {
    console.log("timeout");
    if (info.isFollow === "UN FOLLOW") {
      const res = await axios.post(
        `${backendUrl}addFollow/${info.fromUserId}/${info.toUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } else {
      const res = await axios.delete(
        `${backendUrl}deleteFollow/${info.fromUserId}/${info.toUserId}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    }
  }, 2000);
});

export const getFollow = createAsyncThunk(
  "follow/getFollow",
  async ({ info }) => {
    const res = await axios.get(
      `${backendUrl}getFollow/${info.fromUserId}/${info.toUserId}`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const getFollowers = createAsyncThunk(
  "follow/getFollowers",
  async (userId) => {
    const res = await axios.get(`${backendUrl}getFollowers/${userId}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const getFollowing = createAsyncThunk(
  "follow/getFollowing",
  async (userId) => {
    const res = await axios.get(`${backendUrl}getFollowing/${userId}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState: {
    isFollow: "not follow",
    followers: [],
    following: [],
    followersLoading: "",
    followingLoading: "",
    followLoading: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFollow.fulfilled, (state, action) => {
        state.followLoading = "false";
        state.isFollow = action.payload.message;
      })
      .addCase(getFollow.pending, (state) => {
        state.followLoading = "true";
      })
      .addCase(getFollowers.pending, (state) => {
        state.followersLoading = "true";
      })

      .addCase(getFollowers.fulfilled, (state, action) => {
        state.followersLoading = "false";
        if (action.payload.followers.length > 0) {
          action.payload.followers.map((e) => {
            if (e.profileImage) {
              e.profileImage = `${fileUrl}${e.profileImage}`;
            }
            if (e.coverImage) {
              e.coverImage = `${fileUrl}${e.coverImage}`;
            }
          });

          state.followers = action.payload.followers;
        } else {
          state.followers = [];
        }
      })
      .addCase(getFollowing.pending, (state) => {
        state.followingLoading = "true";
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.followingLoading = "false";
        if (action.payload.following.length > 0) {
          action.payload.following.map((e) => {
            if (e.profileImage) {
              e.profileImage = `${fileUrl}${e.profileImage}`;
            }
            if (e.coverImage) {
              e.coverImage = `${fileUrl}${e.coverImage}`;
            }
          });
          state.following = action.payload.following;
        } else {
          state.following = [];
        }
      });
  },
});

export default followSlice.reducer;
