import React, { Component } from "react";
import Form from "./Form.js"

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

  onClickAdd = e => {
    this.setState({ data: [...this.state.data, e]})
  };

  onClickDelete = e => {
    this.setState({
      data: this.state.data.filter( (item) => item.tditem !== e )
    });
  };

  getTDItems(){

    let result = [];
    for (var i = 0; i < this.state.data.length; i++) {
      result+=this.state.data[i].tditem;
    }

    return result;
  }

  render() {
    return (
      <div>
        <Form onClickAdd={e => this.onClickAdd(e)}
              getUpdtState={outar => outar=this.state.data}
              getTDItems={outar => outar=this.getTDItems()}
              onClickDelete={e => this.onClickDelete(e)}
        />
        <p> {JSON.stringify(this.state.data, null, 2)} </p>
      </div>
    );
  }
}

export default App;

//<p> {JSON.stringify(this.state.data, null, 2)} </p>
