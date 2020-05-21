import React from "react";
import { Box, Button, Container, Grid, TextField, Typography } from '@material-ui/core';

export default class Form extends React.Component {
  state = {
    TodoItem: "",
    TodoItemError: ""
  };

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      TodoItemError: ""
    };

    if (this.state.TodoItem.length < 1) {
      isError = true;
      errors.usernameError = "To Do Item cannot be empty";
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        TodoItem: "",
        TodoItemError: ""
      });
    }
  };

  render() {
    return (
      <form>
        <Container className="todoListMain" maxWidth="sm">
          <Typography variant="h4" gutterBottom>Simple <u>To Do List</u> App</Typography>
          <Typography variant="caption" display="block" align="center" gutterBottom>  ...... powered by ReactJS & Materials UI </Typography>
          <form onSubmit={this.addItem}>
            <Box my={3}>
              <Grid container>
                <Grid item xs>
                  <TextField name="TodoItem" label="Enter To Do Item" variant="outlined" size="small" value={this.state.TodoItem}
                  onChange={e => this.change(e)} errorText={this.state.TodoItemError} floatingLabelFixed
                   />
                </Grid>
                <Grid item xs>
                  <Button label="Add" variant="contained" color="primary"
                  onClick={e => this.onSubmit(e)} />
                </Grid>
              </Grid>
            </Box>
          </form>
        </Container>
      </form>
    );
  }
}
