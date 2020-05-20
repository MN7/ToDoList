import React, { Component } from "react";
import { Button } from '@material-ui/core';
import TodoItems from "./TodoItems";
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
  super(props);
  this.state = {
      items: []
    };
  this.addItem = this.addItem.bind(this);
  this.editItem = this.editItem.bind(this);
  }

  addItem(e) {
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

    console.log(this.state.items);

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
      <div className="todoListMain">
        <div className="header">
          <h1> Simple To Do List App</h1>
          <h5> .. using ReactJS + Materials UI icons</h5>
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputElement = a}
              placeholder="Enter To Do Item">
            </input>
            <Button type="submit">add</Button>
          </form>
        </div>
        <TodoItems entries={this.state.items}
                   edit={this.editItem}/>
        <div className="footer">
          <h5>Current React Version: {REACT_VERSION} </h5>
        </div>
      </div>
    );
  }
}

export default TodoList;
