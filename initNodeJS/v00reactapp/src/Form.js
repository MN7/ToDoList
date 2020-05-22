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
    this.state = {
        tditem: "",
        tditemerror: "",
        tdeditflag: false,
        tdsrchflag: false
      };
  }

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  resetSrch = () => {this.setState({tdsrchflag: false})}

  searchTDItems = (val) => {
    let tmpar = this.props.getUpdtState();
    let idx = tmpar.findIndex(function(obj){return obj.tditem.toString()===val});
    // console.log("val: "+val+": tmpar: "+JSON.stringify(tmpar, null, 3));
    return idx;
  };

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
    this.resetSrch();
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onClickAdd(this.state);
      // clear form

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
    if (this.state.tditem.length<0){ msg="To-Do Item must not be blank"; }
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
    this.resetSrch();
    if (e.length<1){
      this.setState({ tditemerror: "To-Do Item must not be blank"});
      return;
    }
    if (this.searchTDItems(e)>-1) {
      this.setState({ tditemerror: "To-Do Item already exists"});
    } else {
      this.props.onClickEdit(e);
      this.setState({
        tditem: "",
        tditemerror: "",
        tdeditflag: false
      });
    }
  };

  saveEdit = e => {
    this.onClickEdit(e);
  };

  startEditing = e => {
    this.props.startEditing(e);
    this.setState( e => ({
      tditem: e,
      tditemerror: "",
      tdeditflag: true,
      tdsrchflag: false
    }));
  }

  cancelEdit = e => {
    this.setState({
      tditem: "",
      tditemerror: "",
      tdeditflag: false,
      tdsrchflag: false
    });
    this.props.stopEditing();
  };

  onClickDelete = e => {
    this.resetSrch();
    this.props.onClickDelete(e);
  };

  render() {
    const REACT_VERSION = React.version;
    let tempitem = {"tditem": "", "tditemerror": ""};

    return (
      <form>
        <Box name="header" my={3}>
          <Typography variant="h4" display="block" align="justify" gutterBottom>
            Simple <u>To Do List</u> App
          </Typography>
          <Typography variant="subtitle2" display="block" align="justify" gutterBottom>
                .... powered by ReactJS and MaterialUI
          </Typography>
        </Box>
        <Box name="addtditem" my={3}>
          <Grid container align="justify" >
            <Grid item xs={5}>
              <TextField name="tditem" label="Enter To Do Item" variant="outlined" size="small" style={{ width: "90%"}}
              value={this.state.tdeditflag ? "" : this.state.tditem} onChange={e => this.change(e)}
              error={!(this.state.tdeditflag || this.state.tdsrchflag) && this.state.tditemerror !== ""}
              disabled={this.state.tdeditflag}
              helperText={(this.state.tdeditflag || this.state.tdsrchflag) ? "" : this.state.tditemerror}
               />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" onClick={e => this.onClickAdd(e)} endIcon={<Icon>add_circle</Icon>}> Add </Button>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" color="primary" onClick={e => this.onClickSearch(e)} endIcon={<Icon>search</Icon>}> Search </Button>
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
                  {this.props.getUpdtState().map((row) => (
                    <TableRow key={row.tditem}>
                      <TableCell>
                        <TextField label={row.tditem} variant={(row.tditem===this.props.getEditIdx() && this.state.tdeditflag)?"outlined":"standard"}
                                   disabled={!(row.tditem===this.props.getEditIdx() && this.state.tdeditflag)} onChange={e => {tempitem.tditem = e.target.value}}
                                   error={((row.tditem===this.props.getEditIdx() && this.state.tdeditflag) && this.state.tditemerror.length>0)}
                                   helperText={(row.tditem===this.props.getEditIdx() && this.state.tdeditflag) ? this.state.tditemerror:""}
                                   color={(row.tditem===this.props.getEditIdx() && this.state.tdeditflag)?"secondary":"primary"}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {!(row.tditem===this.props.getEditIdx() && this.state.tdeditflag) ?
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
        <Box name="footer" my={3}>
          <Typography variant="caption" display="block" align="justify" gutterBottom>
            Current React Version: {REACT_VERSION}
          </Typography>
        </Box>
      </form>
    );
  }
}

export default Form;
