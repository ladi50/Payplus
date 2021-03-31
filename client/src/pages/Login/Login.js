import React, { useContext, useState } from "react";
import { TextField, Button } from "@material-ui/core";

import { useFetch } from "../../hooks/useFetch";
import { AppContext } from "../../context/context";
import { useStyles } from "../../styles/styles";

const Login = () => {
  const [text, setText] = useState({
    username: "",
    password: ""
  });

  const { fetchHandler } = useFetch();
  const { login } = useContext(AppContext);
  const classes = useStyles()

  const textChange = (e) => {
    const { value, name } = e.target;

    setText((prevState) => ({ ...prevState, [name]: value }));
  };

  const adminLogin = (e) => {
    e.preventDefault();

    fetchHandler("/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(text)
    })
      .then((res) => {
        if (res) {
          login(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={adminLogin} className={classes.form} autoComplete="off">
      <TextField
        label="Username"
        name="username"
        value={text.username}
        onChange={textChange}
        variant="outlined"
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={text.password}
        onChange={textChange}
        variant="outlined"
      />

      <Button type="submit">Login</Button>
    </form>
  );
};

export default Login;
