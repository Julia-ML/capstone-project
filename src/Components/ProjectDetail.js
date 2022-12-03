import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createTask, fetchProjects } from "../store";
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

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks] || [];
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
  } else {
    const column = columns[source.droppableId];
    const copiedTasks = [...column.tasks];
    const [removed] = copiedTasks.splice(source.index, 1);
    copiedTasks.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        tasks: copiedItems,
      },
    });
  }
};

const ProjectDetail = () => {
  const { projects } = useSelector((state) => state);
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
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    status: "To Do",
    projectId: id,
  });

  useEffect(() => {
    if (projects[0] !== undefined) {
      //kept getting project undefined error, changing from projects.length to this seems to fix it??
      const project = projects.find((project) => project.id === id);
      if (project && project.tasks) {
        setProject(project);
        setBacklog(project.tasks.filter((task) => task.status === "Backlog"));
        setTodo(project.tasks.filter((task) => task.status === "To Do"));
        setProgress(
          project.tasks.filter((task) => task.status === "In Progress")
        );
        setDone(project.tasks.filter((task) => task.status === "Done"));
      } else {
        setProject(project);
      }
    }
  }, [projects]);

  useEffect(() => {
    setColumns({
      1: {
        name: "Backlog",
        tasks: backlog,
      },
      2: {
        name: "To do",
        tasks: todo,
      },
      3: {
        name: "In Progress",
        tasks: progress,
      },
      4: {
        name: "Done",
        items: done,
      },
    });
  }, [project]);

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
    setNewTask({ ...newTask, [ev.target.name]: ev.target.value });
  };

  const createNewTask = () => {
    dispatch(createTask(newTask));
    setNewTask({ ...newTask, name: "", description: "" });
    handleClose();
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
                <div style={{ margin: 8 }}>
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
                            <div></div>
                          ) : (
                            column.tasks.map((task, index) => {
                              return (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
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
                                        {task.name}
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
                      margin="dense"
                      id="desc"
                      label="description"
                      name="description"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newTask.description}
                      onChange={onChange}
                      margin="normal"
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
    </div>
  );
};

export default ProjectDetail;
