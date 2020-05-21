import React, { Component } from "react";
import TDTable from "./TDTable.js"
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core"


class Form extends Component {
  constructor(props) {
  super(props);
  this.state = {
      tditem: "",
      tditemerror: "",
    };
  }

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      tditemerror: ""
    };

    if (this.state.tditem.length < 1) {
      isError = true;
      errors.tditemerror = "To-Do Item must not be blank";
    }

    if (this.props.getTDItems().toString().indexOf(this.state.tditem.toString()) >= 0) { // check if item already exists in table.. implement-later.
      isError = true;
      errors.tditemerror = "To-Do Item already exists";
    }

    this.setState({
         ...this.state,
         ...errors
    });

    return isError;
  };

  onClickAdd = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onClickAdd(this.state);
      // clear form
      this.setState({
        tditem: "",
        tditemerror: ""
      });
    }
  };

  onClickDelete = e => {
    this.props.onClickDelete(e);
  }

  render() {
    const REACT_VERSION = React.version;
    return (
      <form>
        <Box name="header" my={3}>
          <Typography variant="h4" display="block" align="justify" gutterBottom>
            Simple <u>To Do List</u> App
          </Typography>
          <Typography variant="subtitle2" display="block" align="justify" gutterBottom>
                .... powered by ReactJS and MaterialUI
          </Typography>
        </Box>
        <Box name="addtditem" my={3}>
          <Grid container align="justify" >
            <Grid item xs={3}>
              <TextField name="tditem" label="Enter To Do Item" variant="outlined" size="small" value={this.state.tditem}
              onChange={e => this.change(e)} error={this.state.tditemerror !== ""} helperText={this.state.tditemerror}
               />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="primary" onClick={e => this.onClickAdd(e)}> Add </Button>
            </Grid>
          </Grid>
        </Box>
        <Box name="statictable" my={3}>
          <TDTable rows={this.props.getUpdtState()} onClickDelete={this.onClickDelete}
          />
        </Box>
        <Box name="footer" my={3}>
          <Typography variant="caption" display="block" align="justify" gutterBottom>
            Current React Version: {REACT_VERSION}
          </Typography>
        </Box>
      </form>
    );
  }
}

export default Form;
