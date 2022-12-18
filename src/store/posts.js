import axios from "axios";

const posts = (state = [], action) => {
    if (action.type === "GET_POSTS") {
        return action.posts;
    }
    return state
}

export const fetchPosts = () => {
    return async (dispatch) => {
      const response = await axios.get("/api/posts");
      dispatch({ type: "GET_POSTS", postss: response.data });
    };
  };

export default posts;