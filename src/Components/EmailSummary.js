import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

const EmailSummary = () => {
  const { projects } = useSelector((state) => state);
  console.log(projects);

  const handleClick = async (project) => {
    const response = await axios.post("/api/emails/summary", { project });
  };
  return (
    <div className="email-summary-buttons">
      {projects.map((project, idx) => {
        return (
          <div key={idx}>
            <Button variant="contained" onClick={() => handleClick(project)}>
              Send email summary for {project.name}
            </Button>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default EmailSummary;
