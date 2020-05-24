import React, { Component } from "react";
import "../confdata/v00jsondata.json"

class Fileops extends Component {

  constructor(props) {
    super(props);
    this.state = {
        fops: {"action": "", "input": []},
        result: ""
    };
  }

  // processInput = e => {
  //   let result="testing";
  //   this.props.updateFOPS(result);
  // }

  render() {
    const inparg=this.props.fopsarg;
    let result="";
    if (inparg.action.length===0) {
      result="No Action Invoked";
    }
    let testelt = <p> input parms: {JSON.stringify(inparg,null,2)} | result: {result}</p>;

    // if (inparg.action.length===0){this.processInput();}

    return(
      testelt
    );
  }
}

export default Fileops
