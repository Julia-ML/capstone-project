import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "./auth";

//Redux Reducer: Manages users on our frontend application.
//Action Types Below
const users = (state = [], action) => {
  //Sets State to new list of users
  if (action.type === "GET_USERS") {
    return action.users;
  }
  //Sets State after removing a user form the current list of users based on the 'id' property
  if(action.type === 'DELETE_USER') {
    return state.filter(user => user.id !== action.userId)
  }
  return state;
};

//Action Creator:
//Is an async function that uses the axios library to make a GET request to the '/api/users' endpoint, retrieves a list of users. 
//It dispatches an action of type GET_USERS with the response data as the users payload. 
export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/users");
    dispatch({ type: "GET_USERS", users: response.data });
  };
};

//Action Creator:
// Is an asunc function that uses the axios library to make a DELETE request to the '/api/users/:id' endpoint.
//It dispatches an action of type DELETE_USER with the 'id' of the 'userId' payload, and then dispatches the logout action.
export const deleteUser = (user) => {
  return async(dispatch)=> {
      await axios.delete(`/api/users/${user.id}`)
      dispatch({type: 'DELETE_USER', userId: user.id})
      dispatch(logout())
  }
}

export default users;
