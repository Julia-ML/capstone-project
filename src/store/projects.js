import axios from "axios";
const projects = (state = [], action) => {
  if (action.type === "GET_PROJECTS") {
    return action.projects;
  }
  if (action.type === "CREATE_PROJECT") {
    return [...state, action.project];
  }
  return state;
};

export const fetchProjects = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/projects");
    dispatch({ type: "GET_PROJECTS", projects: response.data });
  };
};

export const createProject = (newProject) => {
  return async (dispatch) => {
    const response = await axios.post("/api/projects/create", newProject);
    dispatch({ type: "CREATE_PROJECT", project: response.data });
  };
};

export default projects;
