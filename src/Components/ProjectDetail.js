import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  createTask,
  fetchProjects,
  fetchUsers,
  fetchTasks,
  fetchLog,
  addLog,
  updateTask,
} from "../store";
import graph from "./graph";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
const schedule = require("node-schedule");
import axios from "axios";

const ProjectDetail = () => {
  const { projects, tasks, auth, log } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [backlog, setBacklog] = useState([]);
  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTask, setDrawerTask] = useState({});
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    status: "To Do",
    projectId: id,
    teamId: "",
  });

  useEffect(() => {
    dispatch(fetchProjects()),
      dispatch(fetchUsers(), dispatch(fetchTasks()), dispatch(fetchLog(id)));
  }, []);

  useEffect(() => {
    const projectTasks = tasks.filter((task) => {
      return task.projectId == id;
    });

    if (projects[0] !== undefined) {
      //kept getting project undefined error, changing from projects.length to this seems to fix it??
      const project = projects.find((project) => project.id === id);
      projectTasks.length
        ? `${
            (setProject(project),
            setNewTask({ ...newTask, teamId: project.teamId }),
            setBacklog(
              projectTasks.filter((task) => task.status === "Backlog")
            ),
            setTodo(projectTasks.filter((task) => task.status === "To Do")),
            setProgress(
              projectTasks.filter((task) => task.status === "In Progress")
            ),
            setDone(projectTasks.filter((task) => task.status === "Done")))
          }`
        : setProject(project);
    }
  }, [projects, tasks]);

  useEffect(() => {
    setColumns({
      1: {
        id: 1,
        name: "Backlog",
        tasks: backlog,
      },
      2: {
        id: 2,
        name: "To Do",
        tasks: todo,
      },
      3: {
        id: 3,
        name: "In Progress",
        tasks: progress,
      },
      4: {
        id: 4,
        name: "Done",
        tasks: done,
      },
    });
  }, [project, tasks]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (ev) => {
    newTask.name === "" || newTask.description === ""
      ? setDisabled(true)
      : setDisabled(false);
    setNewTask({
      ...newTask,
      [ev.target.name]: ev.target.value,
    });
  };

  const onEdit = (ev) => {
    setDrawerTask({
      ...drawerTask,
      [ev.target.name]: ev.target.value,
    });
  };

  const createNewTask = () => {
    dispatch(createTask(newTask));
    //doesn't show up in column after creating until you refresh?
    if (newTask.status === "To Do") {
      setTodo([...todo, newTask]);
    }
    if (newTask.status === "Backlog") {
      setBacklog([...backlog, newTask]);
    }
    if (newTask.status === "In Progress") {
      setProgress([...progress, newTask]);
    }
    if (newTask.status === "Done") {
      setProgress([...done, newTask]);
    }
    setColumns({ ...columns });
    setNewTask({
      name: "",
      description: "",
      status: "To Do",
      projectId: id,
      teamId: auth.teamId,
    });
    dispatch(fetchTasks());
    handleClose();
  };

  const editTask = () => {
    dispatch(updateTask(drawerTask));
    toggleDrawer();
    //doesn't show up in column after creating until you refresh?
    if (drawerTask.status === "To Do") {
      setTodo([...todo, drawerTask]);
    }
    if (drawerTask.status === "Backlog") {
      setBacklog([...backlog, drawerTask]);
    }
    if (drawerTask.status === "In Progress") {
      setProgress([...progress, drawerTask]);
    }
    if (drawerTask.status === "Done") {
      setProgress([...done, drawerTask]);
    }
    setColumns({ ...columns });
    setDrawerTask({});
    dispatch(fetchTasks());
  };

  const toggleDrawer = () => {
    setDrawerOpen(false);
  };

  const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks,
        },
      });
      const newStatus = columns[destination.droppableId].name;
      const changedTask = removed;
      changedTask.status = newStatus;

      try {
        await axios.put(`/api/tasks/${changedTask.id}`, changedTask);
      } catch (ex) {
        console.log(ex);
      }
    } else {
      const column = columns[source.droppableId];
      const copiedTasks = [...column.tasks];
      const [removed] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedTasks,
        },
      });
    }
  };

  return (
    <div>
      <br />
      <Typography variant="h4" align="center">
        {project.name}
      </Typography>
      <Container
        sx={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div
                  style={{
                    margin: 8,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {!column.tasks ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: "1",
                                minHeight: "100px",
                              }}
                            ></div>
                          ) : (
                            column.tasks.map((task, index) => {
                              return (
                                <Draggable
                                  /* I have no idea why this fixes it, 
                                without +'a' there's an error that says it doesnt have a key/draggableId */
                                  key={task.id + "a"}
                                  draggableId={task.id + "a"}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <Button
                                          onClick={() => {
                                            setDrawerTask(task);
                                            setDrawerOpen(true);
                                          }}
                                        >
                                          {task.name}
                                        </Button>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })
                          )}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
                <Button variant="contained" onClick={handleClickOpen}>
                  + Add a task
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>New Task</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Input task name and description:
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
                      value={newTask.name}
                      onChange={onChange}
                    />
                    <TextField
                      autoFocus
                      id="desc"
                      label="description"
                      name="description"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newTask.description}
                      onChange={onChange}
                      margin="normal"
                      multiline
                    />
                    <Select
                      name="status"
                      value={newTask.status}
                      onChange={onChange}
                      label="status"
                    >
                      <MenuItem value={"To Do"}>To Do</MenuItem>
                      <MenuItem value={"In Progress"}>In Progress</MenuItem>
                      <MenuItem value={"Done"}>Done</MenuItem>
                      <MenuItem value={"Backlog"}>Backlog</MenuItem>
                    </Select>
                    <FormHelperText>Status</FormHelperText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={disabled} onClick={createNewTask}>
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            );
          })}
        </DragDropContext>
      </Container>
      <Drawer
        anchor={"right"}
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: { width: "40%" },
        }}
      >
        <FormControl sx={{ padding: 2, margin: "normal" }}>
          <Typography variant="h3">Task Details</Typography>
          <TextField
            autoFocus
            id="name"
            label="name"
            name="name"
            type="text"
            variant="standard"
            margin="normal"
            fullWidth
            value={drawerTask.name}
            onChange={onEdit}
          />
          <TextField
            autoFocus
            id="desc"
            label="description"
            name="description"
            type="text"
            variant="standard"
            margin="normal"
            value={drawerTask.description}
            onChange={onEdit}
            fullWidth
            multiline
          />
          <Select
            name="status"
            value={drawerTask.status}
            onChange={onEdit}
            label="status"
            margin="normal"
          >
            <MenuItem value={"To Do"}>To Do</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Done"}>Done</MenuItem>
            <MenuItem value={"Backlog"}>Backlog</MenuItem>
          </Select>
          <FormHelperText>Status</FormHelperText>
          <Button variant="contained" onClick={editTask}>
            Update Task
          </Button>
        </FormControl>
      </Drawer>
      <hr />
      <div>{log ? graph(log) : ""}</div>
      <hr />
    </div>
  );
};

export default ProjectDetail;
