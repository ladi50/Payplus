import React, { useContext, useEffect, useState } from "react";
import { TableRow, TableCell, IconButton, Button } from "@material-ui/core";
import { Assessment } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import { AppContext } from "../../context/context";
import { useStyles } from "../../styles/styles";

const UserRow = ({ user }) => {
  const [userShift, setUserShift] = useState(null);
  const [exited, setExited] = useState(false);
  const [hours, setHours] = useState(0);
  const [shiftBreak, setShiftBreak] = useState(0);
  const [breakFinished, setBreakFinished] = useState(false);

  const { username, _id, userId } = user;
  const { fetchHandler } = useFetch();
  const { shifts } = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    fetchHandler(
      shifts ? "/users/userShift/" + userId._id : "/users/userShift/" + _id
    )
      .then((res) => {
        if (res && res.shift) {
          setUserShift(res.shift);

          if (!res.shift.shiftEnd) {
            setHours(
              (
                (new Date().getTime() -
                  new Date(res.shift.createdAt).getTime()) /
                1000 /
                3600
              ).toFixed(2)
            );
          } else {
            setHours(
              (
                (new Date(res.shift.shiftEnd).getTime() -
                  new Date(res.shift.createdAt).getTime()) /
                1000 /
                3600
              ).toFixed(2)
            );
          }

          if (res.shift.break && !res.shift.breakFinished) {
            setShiftBreak(
              (
                (new Date().getTime() - new Date(res.shift.break).getTime()) /
                1000 /
                3600
              ).toFixed(2)
            );
          } else if (res.shift.break && res.shift.breakFinished) {
            setShiftBreak(
              (
                (new Date(res.shift.breakFinished).getTime() -
                  new Date(res.shift.break).getTime()) /
                1000 /
                3600
              ).toFixed(2)
            );
          }

          if (res.shift.breakFinished) {
            setBreakFinished(true);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [fetchHandler, _id, userId, shifts]);

  const enterShift = () => {
    fetchHandler("/users/user/" + _id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: _id
      })
    })
      .then((res) => setUserShift(res.shift))
      .catch((err) => console.log(err));
  };

  const exitShift = () => {
    setExited(true);

    fetchHandler("/users/user/" + _id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ shiftEnd: new Date() })
    })
      .then((res) =>
        setHours(
          (
            (new Date(res.shift.shiftEnd).getTime() -
              new Date(res.shift.createdAt).getTime()) /
            1000 /
            3600
          ).toFixed(2)
        )
      )
      .catch((err) => console.log(err));
  };

  const handleBreak = () => {
    if (shiftBreak !== 0) {
      return fetchHandler("/users/user/" + _id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ breakFinished: new Date() })
      })
        .then((res) =>
          setBreakFinished(
            (
              (new Date(res.shift.breakFinished).getTime() -
                new Date(res.shift.break).getTime()) /
              1000 /
              3600
            ).toFixed(2)
          )
        )
        .catch((err) => console.log(err));
    }

    fetchHandler("/users/user/" + _id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ break: new Date() })
    })
      .then((res) =>
        setShiftBreak(
          (
            (new Date().getTime() - new Date(res.shift.break).getTime()) /
            1000 /
            3600
          ).toFixed(2)
        )
      )
      .catch((err) => console.log(err));
  };

  return (
    <TableRow className={classes.row}>
      <TableCell align="center">P+</TableCell>
      <TableCell align="center">
        {shifts?.length > 0 ? userId._id : _id}
      </TableCell>
      <TableCell align="center">{username || userId.username}</TableCell>
      {!shifts && (
        <>
          <TableCell align="center">
            <Button
              onClick={userShift ? exitShift : enterShift}
              variant="contained"
              color="default"
              disabled={exited || (userShift?.shiftEnd && true)}
            >
              {userShift ? "Exit" : "Enter"}
            </Button>
          </TableCell>

          <TableCell align="center">
            <Button
              onClick={handleBreak}
              variant="contained"
              color="default"
              disabled={
                exited ||
                shifts?.length > 0 ||
                !userShift ||
                (breakFinished && true)
              }
            >
              {shiftBreak !== 0 ? "Finish Break" : "Break"}
            </Button>
          </TableCell>
        </>
      )}
      <TableCell align="center">{shiftBreak}</TableCell>
      <TableCell align="center">{hours}</TableCell>
      <TableCell align="center">
        {userShift
          ? new Date(userShift.createdAt).toLocaleTimeString()
          : "Not entered today"}
      </TableCell>
      {!shifts && (
        <TableCell align="center">
          <Link to={`/user/${_id}`}>
            <IconButton>
              <Assessment />
            </IconButton>
          </Link>
        </TableCell>
      )}
    </TableRow>
  );
};

export default UserRow;
