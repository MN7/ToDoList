import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';

// {row.tditem}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();
  let edititem = props.getEditIdx("abc");
  let tempitem = {"tditem": ""};
  let errmsg = props.errmsg;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">To Do Item</TableCell>
            <TableCell align="right">Edit Item</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.tditem}>
              <TableCell>
                <TextField label={row.tditem} variant={!(row.tditem === edititem)?"standard":"outlined"} disabled={!(row.tditem === edititem)}
                          onChange={e => {tempitem.tditem = e.target.value}} error={(row.tditem === edititem && errmsg.length > 0)} helperText={errmsg}
                />
              </TableCell>
              <TableCell align="right">
                {!(row.tditem === edititem) ?
                  <IconButton aria-label="edit" onClick={ () => props.startEditing(row.tditem)}> <EditIcon fontSize="small" /> </IconButton>
                :
                  <Box>
                    <IconButton aria-label="check" onClick={ () => props.saveEdit(tempitem.tditem)}> <CheckIcon fontSize="small" /> </IconButton>
                    <IconButton aria-label="cancel" onClick={ () => props.cancelEdit(row.tditem)}> <CancelIcon fontSize="small" /> </IconButton>
                  </Box>
                }
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" onClick={ () => props.onClickDelete(row.tditem)} >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
