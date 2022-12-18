import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const EmailSummary = () => {
  const { projects } = useSelector((state) => state);
  const [selectedProject, setSelectedProject] = useState("");

  const handleClick = async () => {
    const response = await axios.post("/api/emails/summary", selectedProject);
    setSelectedProject({});
  };
  const handleChange = (ev) => {
    setSelectedProject(ev.target.value);
  };

  return (
    <Container>
      <Typography align="center" variant="h3" mt={7}>
        Summary Email for team
      </Typography>
      <Box sx={{ margin: "auto", border: 1, width: "50%" }}>
        <FormControl sx={{ margin: "auto", width: "100%" }}>
          <InputLabel>Select a project</InputLabel>
          <Select
            value={selectedProject}
            label="Choose Project"
            onChange={handleChange}>
            {projects.map((project, idx) => {
              return (
                <MenuItem value={project} key={idx}>
                  {project.name}
                </MenuItem>
              );
            })}
          </Select>
          <Button variant="contained" onClick={() => handleClick()}>
            Send Summary email
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default EmailSummary;
