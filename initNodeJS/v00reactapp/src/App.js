import React, { Component } from "react";
import Form from "./Form.js"

class App extends Component {
  state = {
      data: [],
      editIdx: -1
  };

  updtStateArr = (idx, val) => {
    let ar=[...this.state.data];
    ar[idx].tditem=val;
    this.setState({data: ar});
  };

  startEditing = e => {
    this.setState({ editIdx: e });
  };

  stopEditing = e => {
    this.setState({ editIdx: -1 });
  };

  canEditNow = () => {
    return this.state.editIdx === -1;
  };

  getEditIdx = () => { return this.state.editIdx; }

  onClickAdd = e => {
    this.setState({ data: [...this.state.data, e]})
  };

  // myToString(inpar = []){
  //   let result="";
  //   if (inpar.length < 1) return "Empty Array";
  //   return JSON.stringify(inpar, null, 2);
  // }

  onClickEdit = e => {
    let oldval=this.state.editIdx.toString();
    let tmpar = [...this.state.data];
    let idx = tmpar.findIndex(function(obj){return obj.tditem.toString()===oldval});
    this.updtStateArr(idx,e);
    this.stopEditing();
  };

  onClickDelete = e => {
    this.setState({
      data: this.state.data.filter( (item) => item.tditem !== e )
    });
  };

  getTDItems(inpar = []){

    let result = [];
    let tgtar = (inpar.length > 0) ? inpar : this.state.data;
    for (var i = 0; i < tgtar.length; i++) {
      result+=tgtar[i].tditem;
    }

    return result;
  }

  render() {
    return (
      <div>
        <Form onClickAdd={e => this.onClickAdd(e)}
              onClickEdit={e => this.onClickEdit(e)}
              getUpdtState={outar => outar=this.state.data}
              getTDItems={outar => outar=this.getTDItems()}
              onClickDelete={e => this.onClickDelete(e)}
              startEditing={e => this.startEditing(e)}
              stopEditing={e => this.stopEditing()}
              canEditNow={e => this.canEditNow()}
              getEditIdx={e => this.getEditIdx()}
              forceUpdate={e => this.forceUpdate()}
        />
        <p> {JSON.stringify(this.state.data, null, 2)} </p>
      </div>
    );
  }
}

export default App;

//<p> {JSON.stringify(this.state.data, null, 2)} </p>
