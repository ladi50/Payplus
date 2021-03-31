import React, { useContext } from "react";
import { TableHead, TableCell, TableRow } from "@material-ui/core";
import { AppContext } from "../../context/context";
import { useStyles } from "../../styles/styles";

const TableHd = () => {
  const { shifts } = useContext(AppContext);
  const classes = useStyles();

  return (
    <TableHead >
      <TableRow className={classes.head}>
        <TableCell align="center">Company</TableCell>
        <TableCell align="center">Worker ID</TableCell>
        <TableCell align="center">Worker Name</TableCell>
        {!shifts && (
          <>
            <TableCell align="center">Enter/Exit</TableCell>
            <TableCell align="center">Break</TableCell>
          </>
        )}
        <TableCell align="center">Break Time</TableCell>
        <TableCell align="center">Total Hours</TableCell>
        <TableCell align="center">Entered At</TableCell>
        {!shifts && <TableCell align="center">Report</TableCell>}
      </TableRow>
    </TableHead>
  );
};

export default TableHd;
