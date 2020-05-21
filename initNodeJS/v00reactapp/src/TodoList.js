import React, { Component } from "react";
import { Box, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import TodoItems from "./TodoItems";

class TodoList extends Component {
  constructor(props) {
  super(props);
  this.state = {
      items: []
    };
  this.addItem = this.addItem.bind(this);
  this.editItem = this.editItem.bind(this);

  this.debug = false;
  }



  addItem(e) {
    if (this.debug) console.log("reached add item");
    if (this._inputElement.value !== "") {
      var newItem = {
        text: this._inputElement.value,
        key: Date.now()
      };

      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem)
        };
      });

      this._inputElement.value = "";
    }

    if (this.debug) console.log(this.state.items);

    e.preventDefault();
  }

  editItem(key) {
    // at the moment, "edit" is not yet available. The below code will simply delete the item instead.
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });
  }

  deleteItem(key){
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });
  }


  render() {
    const REACT_VERSION = React.version;
    return (

      <Container className="todoListMain" maxWidth="sm">
        <Typography variant="h4" gutterBottom>Simple <u>To Do List</u> App</Typography>
        <Typography variant="caption" display="block" align="center" gutterBottom>  ...... powered by ReactJS & Materials UI </Typography>
        <form onSubmit={this.addItem}>
          <Box my={3}>
            <Grid container>
              <Grid item xs>
                <TextField id="TxfAddItem" label="Enter To Do Item" variant="outlined" size="small"
                inputRef={(a) => this._inputElement = a} />
              </Grid>
              <Grid item xs>
                <Button type="submit" variant="contained" color="primary"> Add </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
        <Box my={3}>
          <TodoItems entries={this.state.items} edit={this.editItem}/>
        </Box>
        <Box my={3}>
          <Typography variant="caption" display="block" gutterBottom> Current React Version: {REACT_VERSION} </Typography>
        </Box>
      </Container>

    );
  }
}

export default TodoList;
