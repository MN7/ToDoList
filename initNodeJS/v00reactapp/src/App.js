import React, { Component } from "react";
import Form from "./Form.js"
// import TDTable from "./TDTable.js"

class App extends Component {
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
    return (
      <div>
        <Form onClickAdd={submission => this.setState({ data: [...this.state.data, submission] })}
              getUpdtState={outar => outar=this.state.data}
        />
        <p> {JSON.stringify(this.state.data, null, 2)} </p>
      </div>
    );
  }
}

export default App;

//<p> {JSON.stringify(this.state.data, null, 2)} </p>
