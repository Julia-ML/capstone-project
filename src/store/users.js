import axios from "axios";
const users = (state = [], action) => {
  if (action.type === "GET_USERS") {
    return action.users;
  }
  return state;
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/users");
    dispatch({ type: "GET_USERS", users: response.data });
  };
};

export default users;
