import React, { Component } from "react";
import { Box, Button, Grid, IconButton, TextField, Typography } from "@material-ui/core"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import Icon from '@material-ui/core/Icon';


// import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

class Form extends Component {
  constructor(props) {
    super(props);
    // myforms = "main", "account", "login"
    this.state = {
      data: [],
      editIdx: -1,
      useridx: -1,
      tditem: "",
      tditemerror: "", // handles to-do item errors (edit, add, search)
      tdeditflag: false,
      tdsrchflag: false,
      aploginflag: false,
      aploginerror: "", // handle new-user creation error + login credential errors.
      apusername: "",
      appassword: "",
      myforms: "main"
      };
  }

  userLogOn(usr,pwd) { this.getUserInfo(usr,pwd); }
  userLogOff() { this.clearStateArr(); }

  getUserInfo = (u,p) => {
      fetch("./api/todoitems")
      .then(res => {
        if (!res.ok) {
          throw(new Error("Fetch failed to obtain JSON info with status: "+res.status));
        } else return res;
      })
      .then(res => res.json())
      .then(json => {
console.log("gui mid json: "+JSON.stringify(json));
let arr=json.map((x) => {return {"tditem":x.tditem, "_id":x._id}});
console.log("gui mid arr: "+JSON.stringify(arr));
        this.setState({data: arr});
        })
      ;
  }

  componentDidMount(){this.getUserInfo(0,0);}

  handleAPIReq = (apiflag, val, idx=-1) => {

console.log("har bgn val: "+val+" idx: "+idx);
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"tditem":val})
    };
    const id=(!(apiflag==="add") && this.state.data[idx]._id);
    let tmpar=(!(apiflag==="add") && [...this.state.data]);
console.log("har mid reqOptions: "+JSON.stringify(reqOptions));

    switch(apiflag){
      default:
        return;
      case "add":
        fetch("./api/todoitems", reqOptions)
          .then(res => {
            if (!res.ok) throw (new Error("POST to db failed with status: "+res.status));
            else return res;
          })
          .then(res => res.json())
          .then(json => {
console.log("har mid ADD ret-json: "+JSON.stringify(json)+" id: "+json._id);
            this.setState({data: [...this.state.data,{"tditem":json.tditem, "_id":json._id}]})
          })
        break;

      case "edit":
        const updarelt={"tditem":val,"_id":id};
        tmpar[idx]=updarelt;
console.log("har mid EDIT tmpar: "+JSON.stringify(tmpar)+" id: "+id+" updarelt: "+JSON.stringify(updarelt));
        fetch("./api/todoitems/"+id, reqOptions)
          .then(res => {
            if(!res.ok) throw (new Error("POST UPDATE to db failed with status: "+res.status));
            else return res;
          })
          .then(res => res.json())
          .then(json => {
console.log("har mid EDIT ret-json: "+JSON.stringify(json)+" success: "+json.success);
            this.setState({data: tmpar})
          })
        break;

      case "delete":
        tmpar.splice(idx,1);
console.log("har mid EDIT tmpar: "+JSON.stringify(tmpar)+" id: "+id+" updarelt: "+JSON.stringify(updarelt));
        fetch("./api/todoitems/"+id, {method: "DELETE"})
          .then(res => {
            if(!res.ok) throw (new Error("DELETE from db failed with status: "+res.status));
            else return res;
          })
          .then(res => res.json())
          .then(json => {
console.log("har mid DELETE ret-json: "+JSON.stringify(json)+" success: "+json.success);
            this.setState({data: tmpar})
          })

        break;
    }


  }

  updtStateArr = (updtflag="add", oldval, newval="") => { // updtflag can be "add", "edit" or "delete"
    let tmpar = [...this.state.data];
    let idx = tmpar.findIndex(function(obj){return obj.tditem.toString()===oldval});
console.log("usa bgn: updtflag: "+updtflag+" oldval: "+oldval+" newval: "+newval);
    switch(updtflag){
      default:
      case "add":
        this.handleAPIReq(updtflag, oldval);
        break;
      case "edit":
        this.handleAPIReq(updtflag, newval, idx);
        break;
      case "delete":
        this.handleAPIReq(updtflag, oldval, idx);

        // tmpar.splice(idx, 1);
        // this.setState({data: tmpar});
        break;
    }
console.log("usa end: state-data: "+JSON.stringify(this.state.data)+" \n tmpar: "+JSON.stringify(tmpar));
  };

  clearStateArr = () => { this.setState({data:[]})}

  getTDItems(inpar = []){

    let result = [];
    let tgtar = (inpar.length > 0) ? inpar : this.state.data;
    for (var i = 0; i < tgtar.length; i++) {
      result+=tgtar[i].tditem;
    }

    return result;
  }

  searchTDItems = (val) => {
    let tmpar = this.state.data;
    let idx = tmpar.findIndex(function(obj){return obj.tditem.toString()===val});
    // console.log("val: "+val+": tmpar: "+JSON.stringify(tmpar, null, 3));
    return idx;
  };

  canEditNow = () => {
    return this.state.editIdx === -1;
  };

  getEditIdx = () => { return this.state.editIdx; }

  // myToString(inpar = []){
  //   let result="";
  //   if (inpar.length < 1) return "Empty Array";
  //   return JSON.stringify(inpar, null, 2);
  // }

  onClickEditDataArr = e => {

  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  resetSrch = () => {this.setState({tdsrchflag: false, tditemerror: ""})}

  validate = () => {
    let isError = false;
    const errors = {
      tditemerror: ""
    };

    if (this.state.tditem.length < 1) {
      isError = true;
      errors.tditemerror = "To-Do Item must not be blank";
    }

    if (this.searchTDItems(this.state.tditem.toString()) > -1) { // check if item already exists in table.. implement-later.
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
      this.updtStateArr("add", this.state.tditem);
      this.setState({
        tditem: "",
        tditemerror: "",
        tdeditflag: false
      });
    }
  };

  onClickSearch = e => {
    // search for entered to-do-item
    let msg="";
    if (this.state.tditem.length<=0){ msg="To-Do Item must not be blank"; }
    else {
      const srchIdx=this.searchTDItems(this.state.tditem.toString());
      if (srchIdx === -1) {
        msg = "To-Do Item "+this.state.tditem.toString()+" does not exist.";
      } else {
        msg = "Found "+this.state.tditem+" at index: "+(srchIdx+1).toString();
      }
    }
    this.setState({tditemerror: msg, tdsrchflag: true});
  };

  onClickEdit = e => {
    if (e.length<1){
      this.setState({ tditemerror: "To-Do Item must not be blank"});
      return;
    }
    if (this.searchTDItems(e)>-1) {
      this.setState({ tditemerror: "To-Do Item already exists"});
    } else {
      this.updtStateArr("edit", this.state.editIdx.toString(), e);
      this.setState({
        tditem: "",
        tditemerror: "",
        editIdx: -1,
        tdeditflag: false
      });
    }
  };

  saveEdit = e => {
    this.onClickEdit(e);
  };

  startEditing = e => {
    this.setState({
      tditem: e,
      tditemerror: "",
      editIdx: e,
      tdeditflag: true,
      tdsrchflag: false
    });
  }

  cancelEdit = e => {
    this.setState({
      tditem: "",
      tditemerror: "",
      editIdx: -1,
      tdeditflag: false,
      tdsrchflag: false
    });
  };

  onClickDelete = e => {
    this.updtStateArr("delete", e);
  };

  onClickLogInPopForm = e => {
    let currflg=this.state.aploginflag;
    let popform=currflg?"account":"login"

    this.setState({"myforms": popform});
  }

  onClickLogInOkay = e => {
    let newflg=true;
    this.userLogOn(this.state.apusername, this.state.appassword);
    this.setState({"aploginflag": newflg, "myforms": "main"});
  }

  onClickLogInCancel = e => {
    let newflg=false;

    this.setState({"aploginflag": newflg, "myforms": "main"});
  }

  onClickLogInCreate = e => {
    let newflg=true;
    // call app.js method to create a new user. Handle errors.
    this.setState({"aploginflag": newflg, "myforms": "main"});
  }

  onClickAcctOkay = e => {
    this.setState({"myforms": "main"});
  }

  onClickAcctLogOff = e => {
    this.userLogOff();
    this.setState({"myforms": "main", "aploginflag": false});
  }

  render() {
    const REACT_VERSION = React.version;
    let tempitem = {"tditem": "", "tditemerror": ""};
    let header =
      <Box name="header" my={3}>
        <Grid container direction="row" justify="space-between" alignItems="flex-start">
          <Grid item xs="auto">
              <Typography variant="h4" display="block" align="justify" gutterBottom>
                Simple <u>To Do List</u> App
              </Typography>
              <Typography variant="subtitle2" display="block" align="justify" gutterBottom>
                    .... powered by <a href="https://reactjs.org/">ReactJS</a> and <a href="https://material-ui.com/">MaterialUI</a>
              </Typography>
          </Grid>
          <Grid item xs="auto">
            <Box name="login" align="right" >
              <Button align="right" onClick={e => this.onClickLogInPopForm(e)} size="small"
                      endIcon={<Icon>person</Icon>} color={this.state.aploginflag?"primary":"secondary"} >
                      {this.state.aploginflag ? this.state.apusername : "LogIn"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    ;
    let footer =
      <Box name="footer" my={3}>
        <Typography variant="caption" display="block" align="justify" gutterBottom>
          Current React Version: {REACT_VERSION}
        </Typography>
        <p>State Array: {JSON.stringify(this.state, null, 3)}</p>
      </Box>
    ;


    let loginelt =
      <form>
        {header}
        <Box mt={-10}>
          <Grid container direction="column" justify="space-evenly" alignItems="flex-end">
            <Grid item xs="auto"> <TextField name="apusername" value={this.state.apusername} onChange={e => this.change(e)}
              error={this.state.aploginerror.length>0? true : false} helperText={this.state.aploginerror}
              variant="standard" size="small" label="EMail ID" autoComplete="current-username" />
            </Grid>
            <Grid item xs="auto"> <TextField name="appassword" value={this.state.appassword} onChange={e => this.change(e)}
              error={this.state.aploginerror.length>0? true : false} helperText={this.state.aploginerror}
              variant="standard" size="small" label="Password" type="password" autoComplete="current-password" />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Grid container direction="row" justify="flex-end" alignItems="flex-end">
              <Grid item xs="auto" mt={1}>
                <Button onClick={e => this.onClickLogInOkay(e)} size="small"
                        endIcon={<Icon>done</Icon>} color="primary" >
                        LogIn
                </Button>
              </Grid>
              <Grid item xs="auto">
                <Button onClick={e => this.onClickLogInCancel(e)} size="small"
                        endIcon={<Icon>cancel</Icon>} color="primary" >
                        Cancel
                </Button>
              </Grid>
              <Grid item xs="auto">
                <Button onClick={e => this.onClickLogInCreate(e)} size="small"
                        endIcon={<Icon>add</Icon>} color="primary" >
                        Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {footer}
      </form>
    ;

    let acctelt =
      <form> {header}
        <p> Account Info Page ... under construction</p>
        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
          <Grid item xs="auto"> <Button onClick={e => this.onClickAcctOkay(e)} size="small" variant="outlined"
                  endIcon={<Icon>done</Icon>} color="primary" >
                  Okay
          </Button> </Grid>
          <Grid item xs="auto">
          <Button onClick={e => this.onClickAcctLogOff(e)} size="small" variant="outlined"
                  endIcon={<Icon>close</Icon>} color="primary" >
                  Log Out
          </Button> </Grid>
        </Grid>
        {footer}
      </form>

    ;

    let mainelt =
      <form>
        {header}
        <Box name="addtditem" my={3}>
          <Grid container align="justify" >
            <Grid item xs={5}>
              <TextField name="tditem" label="Enter To Do Item" variant="outlined" size="small" style={{ width: "90%"}}
              value={this.state.tdeditflag ? "" : this.state.tditem} onChange={e => this.change(e)}
              error={!(this.state.tdeditflag || (this.state.tdsrchflag && this.state.tditem.length!==0)) && this.state.tditemerror !== ""}
              disabled={this.state.tdeditflag}
              helperText={(this.state.tdeditflag || (this.state.tdsrchflag && this.state.tditem.length!==0)) ? "" : this.state.tditemerror}
               />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" onClick={e => this.onClickAdd(e)} endIcon={<Icon>add_circle</Icon>}> Add </Button>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" color="primary" onClick={e => this.onClickSearch(e)} onBlur={e=>this.resetSrch()}
                      endIcon={<Icon>search</Icon>}>
                      Search
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box name="statictable" my={3} >
        <Grid container align="justify">
          <Grid item xs={5}>
            <TableContainer component={Paper} style={{ width: "90%"}} >
              <Table aria-label="simple table" style={{ width: "auto", tableLayout: "auto" }}>
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row">To Do Item</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.data.map((row) => (
                    <TableRow key={row.tditem}>
                      <TableCell>
                        <TextField label={row.tditem} variant={(row.tditem===this.getEditIdx() && this.state.tdeditflag)?"outlined":"standard"}
                                   disabled={!(row.tditem===this.getEditIdx() && this.state.tdeditflag)} onChange={e => {tempitem.tditem = e.target.value}}
                                   error={((row.tditem===this.getEditIdx() && this.state.tdeditflag) && this.state.tditemerror.length>0)}
                                   helperText={(row.tditem===this.getEditIdx() && this.state.tdeditflag) ? this.state.tditemerror:""}
                                   color={(row.tditem===this.getEditIdx() && this.state.tdeditflag)?"secondary":"primary"}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {!(row.tditem===this.getEditIdx() && this.state.tdeditflag) ?
                          <IconButton aria-label="edit" onClick={ () => this.startEditing(row.tditem)}> <EditIcon fontSize="small" /> </IconButton>
                        :
                          <Box>
                            <IconButton aria-label="check" onClick={ () => this.saveEdit(tempitem.tditem)}> <CheckIcon fontSize="small" /> </IconButton>
                            <IconButton aria-label="cancel" onClick={ () => this.cancelEdit(row.tditem)}> <CancelIcon fontSize="small" /> </IconButton>
                          </Box>
                        }
                      </TableCell>
                      <TableCell align="right">
                        <IconButton aria-label="delete" onClick={ () => this.onClickDelete(row.tditem)} >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Search Results" value={this.state.tdsrchflag ? this.state.tditemerror : ""} disabled={true}
                       margin="dense" multiline={true}
            />
          </Grid>
        </Grid>
        </Box>
        {footer}
      </form>
    ;

    switch(this.state.myforms){
      case "login": return loginelt;
      case "account": return acctelt;
      case "main":
      default:
        return mainelt;
    }

  }
}

// onClickAdd={e => this.onClickAdd(e)} onClickEdit={e => this.onClickEdit(e)} getUpdtState={outar => outar=this.state.data}
// getTDItems={outar => outar=this.getTDItems()} onClickDelete={e => this.onClickDelete(e)} startEditing={e => this.startEditing(e)}
// stopEditing={e => this.stopEditing()} canEditNow={e => this.canEditNow()} getEditIdx={e => this.getEditIdx()} forceUpdate={e => this.forceUpdate()}
// userLogOn={ (u,p) => this.userLogOn(u,p)} userLogOff={ e => this.userLogOff()}

export default Form;
