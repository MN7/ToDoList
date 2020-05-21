import React, { Component } from "react";
import { Box, Typography } from "@material-ui/core"

class Form extends Component {

  render() {
    const REACT_VERSION = React.version;
    return (
      <form>
        <Box className="header" my={3}>
          <Typography variant="h4" display="block" align="center" gutterBottom>
            Simple <u>To Do List</u> App
          </Typography>
          <Typography variant="subtitle2" display="block" align="center" gutterBottom>
                .... powered by ReactJS and MaterialUI
          </Typography>
        </Box>
        <Box className="footer" my={3}>
          <Typography variant="caption" display="block" align="center" gutterBottom>
            Current React Version: {REACT_VERSION}
          </Typography>
        </Box>
      </form>
    );
  }
}

export default Form;
