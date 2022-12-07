import axios from "axios";
import { updateUser } from "./auth";
const teams = (state = [], action) => {
  if (action.type === "GET_TEAMS") {
    return action.teams;
  }
  return state;
};

export const fetchTeams = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/teams", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "GET_TEAMS", teams: response.data });
  };
};

export default teams;
