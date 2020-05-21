import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>To Do Item</TableCell>
            <TableCell align="right">Edit Item</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.tditem}>
              <TableCell component="th" scope="row">
                {row.tditem}
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit" >
                  <EditIcon fontSize="small" />
                </IconButton>
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
