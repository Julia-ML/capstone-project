import axios from 'axios';

const projects = (state = [], action) => {
	if (action.type === 'SET_PROJECTS') {
		return action.projects;
	}
	return state;
};

export const fetchProjects = () => {
	return async (dispatch) => {
		const token = window.localStorage.getItem('token');
		const response = await axios.get('/api/projects', {
			headers: {
				authorization: token,
			},
		});
		dispatch({ type: 'SET_PROJECTS', projects: response.data });
	};
};

export default projects;
