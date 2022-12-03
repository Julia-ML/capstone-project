import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

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
  const [project, setProject] = useState({});
  const [backlog, setBacklog] = useState([]);
  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (projects.length) {
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

  return (
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
              <Button variant="contained">+ Add a task</Button>
            </div>
          );
        })}
      </DragDropContext>
    </Container>
  );
};

export default ProjectDetail;
