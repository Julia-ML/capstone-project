import React, { useState, useEffect } from "react";
import { createUser, fetchUsers, fetchProjects, createProject} from "../store"; //add fetchProjects, createProject
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ProjectGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, projects } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [newProject, setNewProject] = useState({name: '', description: ''})
  
  const onChange = (ev) => {
    newProject.name === '' || newProject.value ==='' ? setDisabled(true) : setDisabled(false)
    setNewProject({ ...newProject, [ev.target.name]: ev.target.value });

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const createNewProject = () => {
      console.log(newProject)
      dispatch(createProject(newProject));
      setNewProject({name: '', description: ''});
      handleClose();
      navigate('/projects')
  }

  
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);
  
  
return (
    <div>
    <ul>{projects.length ? projects.map(project => {return <li key={project.id}>{project.name } : {project.description}</li>}) : ''}</ul>
    <Button variant="contained" onClick={handleClickOpen}>Create New Project</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Input project name and description: 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            value={newProject.name}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="desc"
            label="description"
            name="description"
            type="text"
            fullWidth
            variant="standard"
            value={newProject.description}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled = {disabled} onClick={createNewProject}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
    
};

export default ProjectGallery;
