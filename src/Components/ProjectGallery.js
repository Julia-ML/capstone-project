import React, { useState, useEffect } from "react";
import { createUser, fetchUsers} from "../store"; //add fetchProjects, createProject
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
  const { auth } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const createNewProject = () => {
      //dispatch(createProject());
  }

  
  useEffect(() => {
    dispatch(fetchUsers())
    //, dispatch(fetchProjects());
  }, []);
  
  
return (
    <div>
    <Button variant="contained" onClick={handleClickOpen}>Create New Project</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Input project name: 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose, createNewProject}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
    
};

export default ProjectGallery;
