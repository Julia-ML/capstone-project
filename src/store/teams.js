import axios from "axios";
const teams = (state = [], action) => {
  if (action.type === "GET_TEAMS") {
    return action.teams;
  }
  if (action.type === "REMOVE_MEMBER_TEAM") {
    return {
      ...state,
      users: state.users.reduce((accumulator, user) => {
        if (action.removedMember.id === user.id) {
          return accumulator;
        }
        accumulator.push(user);
        return accumulator;
      }, []),
    };
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

export const RemoveTeamMember = (member) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put("/api/teams/remove/member", member, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "REMOVE_MEMBER_TEAM", removedMember: response.data });
  };
};

export default teams;
