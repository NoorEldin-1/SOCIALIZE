import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl, fileUrl, formatRelativeTime } from "../main";

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

export const toggleLike = createAsyncThunk(
  "post/toggleLike",
  async (post_id) => {
    const res = await axios.post(
      `${backendUrl}postLike/${post_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const toggleShare = createAsyncThunk(
  "post/toggleShare",
  async (post_id) => {
    const res = await axios.post(
      `${backendUrl}postShare/${post_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const postLikes = createAsyncThunk("post/postLikes", async (post_id) => {
  const res = await axios.get(`${backendUrl}postLike/${post_id}`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return res.data;
});

export const postShares = createAsyncThunk(
  "post/postShares",
  async (post_id) => {
    const res = await axios.get(`${backendUrl}postShare/${post_id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const addComment = createAsyncThunk("post/addComment", async (info) => {
  const res = await axios.post(
    `${backendUrl}postComment/${info.post_id}`,
    {
      comment: info.comment,
    },
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
});

export const postComments = createAsyncThunk(
  "post/postComments",
  async (post_id) => {
    const res = await axios.get(`${backendUrl}postComments/${post_id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const userLikes = createAsyncThunk(
  "post/userLikes",
  async (username) => {
    const res = await axios.get(`${backendUrl}posts/likes/${username}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const userShares = createAsyncThunk(
  "post/userShares",
  async (username) => {
    const res = await axios.get(`${backendUrl}posts/shares/${username}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const nextProfilePosts = createAsyncThunk(
  "post/nextProfilePosts",
  async (url) => {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const nextLikesPosts = createAsyncThunk(
  "post/nextLikesPosts",
  async (url) => {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const nextSharesPosts = createAsyncThunk(
  "post/nextSharesPosts",
  async (url) => {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const nextForYouPosts = createAsyncThunk(
  "post/nextForYouPosts",
  async (url) => {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const nextFollowingPosts = createAsyncThunk(
  "post/nextFollowingPosts",
  async (url) => {
    const res = await axios.get(url, {
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
    userLikes: [],
    userShares: [],
    postInfo: {},
    postLikes: [],
    postShares: [],
    postComments: [],
    addPostLoading: "",
    profilePostsLoading: "",
    deletePostLoading: "",
    forYouPostsLoading: "",
    followingPostsLoading: "",
    postLikesLoading: "",
    postSharesLoading: "",
    postCommentsLoading: "",
    addCommentLoading: "",
    userLikesLoading: "",
    userSharesLoading: "",
    nextProfilePosts: "",
    nextForYouPosts: "",
    nextFollowingPosts: "",
    nextLikesPosts: "",
    nextSharesPosts: "",
    paginateLoading: "false",
  },
  reducers: {
    reset: (state) => {
      state.addPostLoading = "";
      state.postInfo = {};
      state.deletePostLoading = "";
      state.postLikes = [];
      state.postLikesLoading = "";
      state.postShares = [];
      state.postSharesLoading = "";
      state.postComments = [];
      state.postCommentsLoading = "";
      state.addCommentLoading = "";
      state.userLikesLoading = "";
      state.userLikes = [];
      state.userShares = [];
      state.userSharesLoading = "";
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

        post.created_at = formatRelativeTime(post.created_at);

        if (action.payload.post.image) {
          post.image = `${fileUrl}${action.payload.post.image}`;
        }

        state.addPostLoading = "false";
        state.profilePosts = [post, ...state.profilePosts];
        window.location.href = "/";
      })
      .addCase(profilePosts.pending, (state) => {
        state.profilePostsLoading = "true";
      })
      .addCase(profilePosts.fulfilled, (state, action) => {
        state.profilePostsLoading = "false";

        state.nextProfilePosts = action.payload.posts.next_page_url;
        let posts = action.payload.posts.data;

        if (posts.length > 0) {
          posts = posts.map((e) => {
            e.created_at = formatRelativeTime(e.created_at);
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

        state.nextForYouPosts = action.payload.posts.next_page_url;
        let posts = action.payload.posts.data;
        if (posts.length > 0) {
          posts = posts.map((e) => {
            e.created_at = formatRelativeTime(e.created_at);
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
        state.nextFollowingPosts = action.payload.posts.next_page_url;
        let posts = action.payload.posts.data;
        if (posts.length > 0) {
          posts = posts.map((e) => {
            e.created_at = formatRelativeTime(e.created_at);
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
      })
      .addCase(toggleLike.pending, () => {})
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.forYouPosts = state.forYouPosts.map((e) => {
          if (e.id == action.payload.post_id) {
            e.likes_count = e.liked ? e.likes_count - 1 : e.likes_count + 1;
            e.liked = !e.liked;
          }
          return e;
        });

        state.followingPosts = state.followingPosts.map((e) => {
          if (e.id == action.payload.post_id) {
            e.likes_count = e.liked ? e.likes_count - 1 : e.likes_count + 1;
            e.liked = !e.liked;
          }
          return e;
        });

        state.profilePosts = state.profilePosts.map((e) => {
          if (e.id == action.payload.post_id) {
            e.likes_count = e.liked ? e.likes_count - 1 : e.likes_count + 1;
            e.liked = !e.liked;
          }
          return e;
        });

        state.userLikes = state.userLikes.map((e) => {
          if (e.id == action.payload.post_id) {
            e.likes_count = e.liked ? e.likes_count - 1 : e.likes_count + 1;
            e.liked = !e.liked;
          }
          return e;
        });
        state.userShares = state.userShares.map((e) => {
          if (e.id == action.payload.post_id) {
            e.likes_count = e.liked ? e.likes_count - 1 : e.likes_count + 1;
            e.liked = !e.liked;
          }
          return e;
        });
      })
      .addCase(toggleShare.pending, () => {})
      .addCase(toggleShare.fulfilled, (state, action) => {
        state.forYouPosts = state.forYouPosts.map((e) => {
          if (e.id == action.payload.post_id) {
            e.shares_count = e.shared ? e.shares_count - 1 : e.shares_count + 1;
            e.shared = !e.shared;
          }
          return e;
        });

        state.followingPosts = state.followingPosts.map((e) => {
          if (e.id == action.payload.post_id) {
            e.shares_count = e.shared ? e.shares_count - 1 : e.shares_count + 1;
            e.shared = !e.shared;
          }
          return e;
        });

        state.profilePosts = state.profilePosts.map((e) => {
          if (e.id == action.payload.post_id) {
            e.shares_count = e.shared ? e.shares_count - 1 : e.shares_count + 1;
            e.shared = !e.shared;
          }
          return e;
        });

        state.userLikes = state.userLikes.map((e) => {
          if (e.id == action.payload.post_id) {
            e.shares_count = e.shared ? e.shares_count - 1 : e.shares_count + 1;
            e.shared = !e.shared;
          }
          return e;
        });

        state.userShares = state.userShares.map((e) => {
          if (e.id == action.payload.post_id) {
            e.shares_count = e.shared ? e.shares_count - 1 : e.shares_count + 1;
            e.shared = !e.shared;
          }
          return e;
        });
      })
      .addCase(postLikes.pending, (state) => {
        state.postLikesLoading = "true";
      })
      .addCase(postLikes.fulfilled, (state, action) => {
        state.postLikesLoading = "false";
        if (action.payload.users.length > 0) {
          state.postLikes = action.payload.users.map((e) => {
            if (e.profileImage) {
              e.profileImage = `${fileUrl}${e.profileImage}`;
            }
            if (e.coverImage) {
              e.coverImage = `${fileUrl}${e.coverImage}`;
            }
            return e;
          });
        } else {
          state.postLikes = [];
        }
      })
      .addCase(postShares.pending, (state) => {
        state.postSharesLoading = "true";
      })
      .addCase(postShares.fulfilled, (state, action) => {
        state.postSharesLoading = "false";
        if (action.payload.users.length > 0) {
          state.postShares = action.payload.users.map((e) => {
            if (e.profileImage) {
              e.profileImage = `${fileUrl}${e.profileImage}`;
            }
            if (e.coverImage) {
              e.coverImage = `${fileUrl}${e.coverImage}`;
            }
            return e;
          });
        } else {
          state.postShares = [];
        }
      })
      .addCase(addComment.pending, (state) => {
        state.addCommentLoading = "true";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addCommentLoading = "false";

        let comment = action.payload.comment;

        comment.created_at = formatRelativeTime(comment.created_at);

        if (comment.user.profileImage) {
          comment.user.profileImage = `${fileUrl}${comment.user.profileImage}`;
        }

        if (comment.user.coverImage) {
          comment.user.coverImage = `${fileUrl}${comment.user.coverImage}`;
        }

        state.postComments = [comment, ...state.postComments];

        state.forYouPosts = state.forYouPosts.map((e) => {
          if (e.id == state.postInfo.id) {
            e.comments_count = e.comments_count + 1;
          }
          return e;
        });

        state.followingPosts = state.followingPosts.map((e) => {
          if (e.id == state.postInfo.id) {
            e.comments_count = e.comments_count + 1;
          }
          return e;
        });

        state.profilePosts = state.profilePosts.map((e) => {
          if (e.id == state.postInfo.id) {
            e.comments_count = e.comments_count + 1;
          }
          return e;
        });

        state.userShares = state.userShares.map((e) => {
          if (e.id == state.postInfo.id) {
            e.comments_count = e.comments_count + 1;
          }
          return e;
        });

        state.userLikes = state.userLikes.map((e) => {
          if (e.id == state.postInfo.id) {
            e.comments_count = e.comments_count + 1;
          }
          return e;
        });
      })
      .addCase(postComments.pending, (state) => {
        state.postCommentsLoading = "true";
      })
      .addCase(postComments.fulfilled, (state, action) => {
        state.postCommentsLoading = "false";
        let comments = action.payload.comments;
        comments = comments.map((e) => {
          e.created_at = formatRelativeTime(e.created_at);
          if (e.user.profileImage) {
            e.user.profileImage = `${fileUrl}${e.user.profileImage}`;
          }
          if (e.user.coverImage) {
            e.user.coverImage = `${fileUrl}${e.user.coverImage}`;
          }
          return e;
        });

        state.postComments = comments;
      })
      .addCase(userLikes.pending, (state) => {
        state.userLikesLoading = "true";
      })
      .addCase(userLikes.fulfilled, (state, action) => {
        state.userLikesLoading = "false";

        state.nextLikesPosts = action.payload.posts.next_page_url;
        let posts = action.payload.posts.data;
        if (posts.length > 0) {
          state.userLikes = posts.map((e) => {
            e.created_at = formatRelativeTime(e.created_at);
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
      })
      .addCase(userShares.pending, (state) => {
        state.userSharesLoading = "true";
      })
      .addCase(userShares.fulfilled, (state, action) => {
        state.userSharesLoading = "false";
        state.nextSharesPosts = action.payload.posts.next_page_url;
        let posts = action.payload.posts.data;
        if (posts.length > 0) {
          state.userShares = posts.map((e) => {
            e.created_at = formatRelativeTime(e.created_at);
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
        } else {
          state.userShares = [];
        }
      })
      .addCase(nextProfilePosts.pending, (state) => {
        state.paginateLoading = "true";
      })
      .addCase(nextProfilePosts.fulfilled, (state, action) => {
        state.paginateLoading = "false";

        state.nextProfilePosts = action.payload.posts.next_page_url;
        let posts = action.payload.posts.data;
        if (posts.length > 0) {
          posts = posts.map((e) => {
            e.created_at = formatRelativeTime(e.created_at);
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
        state.profilePosts = [...state.profilePosts, ...posts];
      })
      .addCase(nextLikesPosts.pending, (state) => {
        state.paginateLoading = "true";
      })
      .addCase(nextLikesPosts.fulfilled, (state, action) => {
        state.paginateLoading = "false";

        state.nextLikesPosts = action.payload.posts.next_page_url;
        let posts = action.payload.posts.data;
        if (posts.length > 0) {
          posts = posts.map((e) => {
            e.created_at = formatRelativeTime(e.created_at);
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
        state.userLikes = [...state.userLikes, ...posts];
      })
      .addCase(nextSharesPosts.pending, (state) => {
        state.paginateLoading = "true";
      })
      .addCase(nextSharesPosts.fulfilled, (state, action) => {
        state.paginateLoading = "false";
        state.nextSharesPosts = action.payload.posts.next_page_url;
        let posts = action.payload.posts.data;
        if (posts.length > 0) {
          posts = posts.map((e) => {
            e.created_at = formatRelativeTime(e.created_at);
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
        state.userShares = [...state.userShares, ...posts];
      })
      .addCase(nextForYouPosts.pending, (state) => {
        state.paginateLoading = "true";
      })
      .addCase(nextForYouPosts.fulfilled, (state, action) => {
        state.paginateLoading = "false";
        state.nextForYouPosts = action.payload.posts.next_page_url;
        let posts = action.payload.posts.data;
        if (posts.length > 0) {
          posts = posts.map((e) => {
            e.created_at = formatRelativeTime(e.created_at);
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
        state.forYouPosts = [...state.forYouPosts, ...posts];
      })
      .addCase(nextFollowingPosts.pending, (state) => {
        state.paginateLoading = "true";
      })
      .addCase(nextFollowingPosts.fulfilled, (state, action) => {
        state.paginateLoading = "false";
        state.nextFollowingPosts = action.payload.posts.next_page_url;
        let posts = action.payload.posts.data;
        if (posts.length > 0) {
          posts = posts.map((e) => {
            e.created_at = formatRelativeTime(e.created_at);
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
        state.followingPosts = [...state.followingPosts, ...posts];
      });
  },
});
export const { reset, changePostInfo } = postSlice.actions;
export default postSlice.reducer;
