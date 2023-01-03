import axios from "axios";

//Redux Reducer: Manages posts on our frontend application.
//Action Types Below
const posts = (state = [], action) => {
  //Sets State to new list of posts
    if (action.type === "GET_POSTS") {
        return action.posts;
    }
    //Adds a new post to the current list of posts
    if (action.type === "CREATE_POST") {
		return [...state, action.post];
	}
    return state
}

//Action Creator:
//Is an async function that uses the axios library to make a GET request to the '/api/posts' endpoint, retrieves a list of posts.
//It dispatches an action of type GET_POSTS with the response data as the posts payload.
export const fetchPosts = () => {
    return async (dispatch) => {
      const response = await axios.get("/api/posts");
      dispatch({ type: "GET_POSTS", posts: response.data });
    };
  };

//Action Creator:
//Is an async funtion that uses the axios library to make a POST request to the '/api/posts' endpoint with the post argument as the request body.
//It dispatches the action type CREATE_POST with the response data as the post payload.
export const createPost = (post) => {
	return async (dispatch) => {
		const response = await axios.post("/api/posts", post);
		dispatch({ type: "CREATE_POST", post: response.data });
	};
};

export default posts;