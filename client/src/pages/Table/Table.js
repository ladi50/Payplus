import React from "react";
import { Table, TableContainer, Paper } from "@material-ui/core";

import TableHd from "../../components/TableHd/TableHd";
import TableBd from "../../components/TableBd/TableBd";
import Button from "../../components/Button/Button";
import { useStyles } from "../../styles/styles";

const UsersTable = () => {
  const classes = useStyles();

  return (
    <>
      <Button />

      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHd />

          <TableBd />
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
