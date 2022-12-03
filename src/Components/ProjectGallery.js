import React, { useState, useEffect } from "react";
import {
  createUser,
  fetchUsers,
  fetchProjects,
  createProject,
  deleteProject,
} from "../store"; //add fetchProjects, createProject
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ProjectGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, projects } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    userId: `${auth.id}`,
  });

  const onChange = (ev) => {
    newProject.name === "" || newProject.value === ""
      ? setDisabled(true)
      : setDisabled(false);
    setNewProject({ ...newProject, [ev.target.name]: ev.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewProject = () => {
    console.log(newProject);
    dispatch(createProject(newProject));
    setNewProject({ name: "", description: "" });
    handleClose();
    navigate("/projects");
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <div>
      <Typography align="right" sx={{ marginRight: 6 }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Create New Project
        </Button>
      </Typography>
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
          <Button disabled={disabled} onClick={createNewProject}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={2} columns={4} sx={{ margin: 3, width: "95%" }}>
        {projects.length
          ? projects.map((project) => {
              return (
                <Grid item key={project.id} xs={1} md={1} lg={1}>
                  <Card key={project.id}>
                    <CardContent>
                      <Typography align="center">
                        <Button
                          onClick={() => {
                            navigate(`/projects/${project.id}`);
                          }}
                        >
                          <Typography
                            sx={{ fontSize: 20, fontWeight: "medium" }}
                            align="center"
                          >
                            {project.name}
                          </Typography>
                        </Button>
                      </Typography>
                      <br />
                      <Typography paragraph={true} sx={{ width: "90%" }}>
                        {project.description}
                      </Typography>
                      {auth.id === project.userId ? (
                        <Typography align="right">
                          <Button
                            onClick={() => {
                              dispatch(
                                deleteProject(`${project.id}`, navigate)
                              );
                            }}
                            variant="outlined"
                            size="small"
                          >
                            delete
                          </Button>
                        </Typography>
                      ) : (
                        ""
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          : ""}
      </Grid>
    </div>
  );
};

export default ProjectGallery;
