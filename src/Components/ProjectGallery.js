import React, { useState, useEffect } from "react";
import {
  fetchUsers,
  fetchProjects,
  createProject,
  deleteProject,
  putProject,
} from "../store";
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
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const ProjectGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, projects, users } = useSelector((state) => state);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    userId: "",
    teamId: "",
  });
  const [editProject, setEditProject] = useState({
    id: "",
    name: "",
    description: "",
    userId: "",
    teamId: "",
  });

  const onChange = (ev) => {
    if (!edit) {
      newProject.name === "" || newProject.value === ""
        ? setDisabled(true)
        : setDisabled(false);
      setNewProject({ ...newProject, [ev.target.name]: ev.target.value });
    }
    if (edit) {
      editProject.name === "" || editProject.value === ""
        ? setDisabled(true)
        : setDisabled(false);
      setEditProject({ ...editProject, [ev.target.name]: ev.target.value });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEdit(false);
    setOpen(false);
  };

  const createNewProject = () => {
    if (auth.teamId !== undefined) {
      dispatch(createProject(newProject));
      setNewProject({ ...newProject, name: "", description: "" });
      handleClose();
      navigate("/projects");
    } else {
      alert("only admins and team members can create projects!");
    }
  };

  const updateProject = () => {
    dispatch(putProject(editProject));
    setEditProject({ ...editProject, id: "", name: "", description: "" });
    handleClose();
    navigate("/projects");
  };

  useEffect(() => {
    dispatch(fetchProjects()), dispatch(fetchUsers());
  }, []);

  const user = users.find((user) => user.id === auth.id);

  useEffect(() => {
    user !== undefined
      ? setNewProject({
          ...newProject,
          userId: user.team.adminId,
          teamId: user.team.id,
        }) &&
        setEditProject({
          ...editProject,
          userId: user.team.adminId,
          teamId: user.team.id,
        })
      : "";
  }, [user]);

  return (
    <div>
      <Typography align="right" sx={{ marginRight: 6, marginTop: 3 }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Create New Project
        </Button>
      </Typography>
      <Dialog open={open} onClose={handleClose}>
        {!edit ? (
          <DialogTitle>New Project</DialogTitle>
        ) : (
          <DialogTitle>Edit</DialogTitle>
        )}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            value={!edit ? newProject.name : editProject.name}
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
            value={!edit ? newProject.description : editProject.description}
            onChange={onChange}
          />
          {edit ? (
            <Button
              onClick={() => {
                handleClose();
                dispatch(deleteProject(`${editProject.id}`, navigate));
              }}
              variant="outlined"
              size="small"
            >
              delete project
            </Button>
          ) : (
            ""
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={disabled}
            onClick={() => {
              !edit ? createNewProject() : updateProject();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        spacing={2}
        columns={4}
        sx={{
          margin: 3,
          width: "95%",
          maxHeight: "400px",
          overflowY: "scroll",
        }}
      >
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
                          <Tooltip title="Edit task">
                            <IconButton
                              onClick={() => {
                                handleClickOpen();
                                setEdit(true);
                                setEditProject(project);
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
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
