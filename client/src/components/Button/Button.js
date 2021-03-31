import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button as Btn } from "@material-ui/core";
import { AppContext } from "../../context/context";
import { useStyles } from "../../styles/styles";

const Button = () => {
  const { token, logout } = useContext(AppContext);
  const classes = useStyles();

  return (
    <>
      {token ? (
        <>
          <Link to="/signup">
            <Btn className={classes.button} variant="contained">
              Register New User
            </Btn>
          </Link>

          <Btn
            className={classes.button}
            onClick={() => logout()}
            variant="contained"
          >
            Admin Logout
          </Btn>
        </>
      ) : (
        <Link to="/login">
          <Btn className={classes.button} variant="contained">
            Admin Login
          </Btn>
        </Link>
      )}
    </>
  );
};

export default Button;
