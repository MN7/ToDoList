import React, { Component } from "react";
import { Box, Typography } from '@material-ui/core';
// import MuiThemeProvider from "@material-ui/styles";
// import injectTapEventPlugin from "react-tap-event-plugin";

import MyForm from "./MyForm.js";
import MyTable from "./MyTable.js";

// injectTapEventPlugin();

class MyApp extends Component {
  state = {
    data: [],
    editIdx: -1
  };

  handleRemove = i => {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i)
    }));
  };

  startEditing = i => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleChange = (e, name, i) => {
    const { value } = e.target;
    this.setState(state => ({
      data: state.data.map(
        (row, j) => (j === i ? { ...row, [name]: value } : row)
      )
    }));
  };

  render() {
    const REACT_VERSION = React.version;
    return (
      // <MuiThemeProvider>
        <div className="MyApp">
          <MyForm
            onSubmit={submission =>
              this.setState({
                data: [...this.state.data, submission]
              })}
          />
          <Box my={3}>
            <MyTable
              handleRemove={this.handleRemove}
              startEditing={this.startEditing}
              editIdx={this.state.editIdx}
              stopEditing={this.stopEditing}
              handleChange={this.handleChange}
              data={this.state.data}
              header={[
                {
                  name: "To Do Item",
                  prop: "TodoItem"
                }
              ]}
            />
          </Box>
          <Box my={3}>
            <Typography variant="caption" display="block" gutterBottom> Current React Version: {REACT_VERSION} </Typography>
          </Box>
        </div>
      // </MuiThemeProvider>
    );
  }
}

export default MyApp;
