import React, { Component } from "react";
import Form from "./Form.js"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appstate: []
    };
  }

  render() {
    return (
      <div style={{'max-width': '800px'}} >
        <Form />
      </div>
    );
  }
}

export default App;

//<p> {JSON.stringify(this.state.data, null, 2)} </p>
