import React, { Component } from "react";

class TodoItems extends Component {

  constructor(props) {
      super(props);

      this.createTasks = this.createTasks.bind(this);
  }

  edit(key) {
    this.props.edit(key);
  }

  createTasks(item) {
    return <li onClick={() => this.edit(item.key)}
      key={item.key}>{item.text}</li>
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
};

export default TodoItems;
