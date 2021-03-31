import React, { useContext, useEffect } from "react";
import { TableBody } from "@material-ui/core";
import { useParams } from "react-router-dom";

import UserRow from "../UserRow/UserRow";
import { AppContext } from "../../context/context";

const TableBd = () => {
  const { users, shifts, getUsers, getUserShifts } = useContext(AppContext);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      getUserShifts(userId);
    } else {
      getUsers();
    }
  }, [getUsers, userId, getUserShifts]);

  return (
    <TableBody>
      {users?.length > 0 &&
        users.map((user) => <UserRow key={user._id} user={user} />)}
      {shifts?.length > 0 &&
        shifts.map((user) => <UserRow key={user._id} user={user} />)}
    </TableBody>
  );
};

export default TableBd;
