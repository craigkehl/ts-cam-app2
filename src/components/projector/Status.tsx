import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { projectorRequest } from "../../util/projector-http-request";

import React from "react";

type Props = {};

const Status = (props: Props) => {
    const onStatusHandler = (command: String) => {
        const statusCommand = `${command}/status`
        projectorRequest(statusCommand)
    }
  return (
    <Box
      sx={{
        width: 1,
        margin: "2rem auto",
      }}
    >
      <Button onClick={onStatusHandler.bind(this, "power")} variant='contained' >
        Power
      </Button>
      <Button 
        onClick={onStatusHandler.bind(this, "blank")}
        variant='contained'
        >
        Blank
      </Button>
      <Button 
        onClick={onStatusHandler.bind(this, "source")}
        variant='contained'
        >
        Source
      </Button>
    </Box>
  );
};

export default Status;
