import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl, fileUrl } from "../main";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (post, { rejectWithValue }) => {
    try {
      if (post.image) {
        const formData = new FormData();
        formData.append("content", post.content);
        formData.append("image", post.image);
        const response = await axios.post(`${backendUrl}createPost`, formData, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
        return response.data;
      } else {
        const response = await axios.post(
          `${backendUrl}createPost`,
          {
            content: post.content,
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profilePosts = createAsyncThunk(
  "post/profilePosts",
  async (username) => {
    const res = await axios.get(`${backendUrl}profile/${username}/posts`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const deletePost = createAsyncThunk("post/deletePost", async (post) => {
  await axios.delete(`${backendUrl}deletePost/${post.id}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
});

export const forYouPosts = createAsyncThunk("post/forYouPosts", async () => {
  const res = await axios.get(`${backendUrl}posts/forYou`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return res.data;
});

export const followingPosts = createAsyncThunk(
  "post/followingPosts",
  async () => {
    const res = await axios.get(`${backendUrl}posts/following`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    profilePosts: [],
    forYouPosts: [],
    followingPosts: [],
    postInfo: {},
    addPostLoading: "",
    profilePostsLoading: "",
    deletePostLoading: "",
    forYouPostsLoading: "",
    followingPostsLoading: "",
  },
  reducers: {
    reset: (state) => {
      state.addPostLoading = "";
      state.postInfo = {};
      state.deletePostLoading = "";
    },
    changePostInfo: (state, action) => {
      state.postInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.addPostLoading = "true";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        let post = action.payload.post;

        if (action.payload.post.image) {
          post.image = `${fileUrl}${action.payload.post.image}`;
        }

        state.addPostLoading = "false";
        state.profilePosts = [post, ...state.profilePosts];
      })
      .addCase(profilePosts.pending, (state) => {
        state.profilePostsLoading = "true";
      })
      .addCase(profilePosts.fulfilled, (state, action) => {
        state.profilePostsLoading = "false";
        let posts = action.payload.posts;
        if (posts.length > 0) {
          posts = posts.map((e) => {
            if (e.image) {
              e.image = `${fileUrl}${e.image}`;
            }
            return e;
          });
        }
        state.profilePosts = posts;
      })
      .addCase(profilePosts.rejected, () => {
        window.location.href = "/profile";
      })
      .addCase(deletePost.pending, (state) => {
        state.deletePostLoading = "true";
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.deletePostLoading = "false";
        state.profilePosts = state.profilePosts.filter(
          (e) => e.id !== state.postInfo.id
        );
      })
      .addCase(forYouPosts.pending, (state) => {
        state.forYouPostsLoading = "true";
      })
      .addCase(forYouPosts.fulfilled, (state, action) => {
        state.forYouPostsLoading = "false";
        let posts = action.payload.posts;
        if (posts.length > 0) {
          posts = posts.map((e) => {
            if (e.image) {
              e.image = `${fileUrl}${e.image}`;
            }
            if (e.user.profileImage) {
              e.user.profileImage = `${fileUrl}${e.user.profileImage}`;
            }
            if (e.user.coverImage) {
              e.user.coverImage = `${fileUrl}${e.user.coverImage}`;
            }
            return e;
          });
        }
        state.forYouPosts = posts;
      })
      .addCase(followingPosts.pending, (state) => {
        state.followingPostsLoading = "true";
      })
      .addCase(followingPosts.fulfilled, (state, action) => {
        state.followingPostsLoading = "false";
        let posts = action.payload.posts;
        if (posts.length > 0) {
          posts = posts.map((e) => {
            if (e.image) {
              e.image = `${fileUrl}${e.image}`;
            }
            if (e.user.profileImage) {
              e.user.profileImage = `${fileUrl}${e.user.profileImage}`;
            }
            if (e.user.coverImage) {
              e.user.coverImage = `${fileUrl}${e.user.coverImage}`;
            }
            return e;
          });
        }
        state.followingPosts = posts;
      });
  },
});
export const { reset, changePostInfo } = postSlice.actions;
export default postSlice.reducer;
