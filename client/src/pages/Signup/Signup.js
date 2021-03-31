import React, { useContext, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router";

import { useFetch } from "../../hooks/useFetch";
import { AppContext } from "../../context/context";
import { useStyles } from "../../styles/styles";

const Signup = () => {
  const [text, setText] = useState({
    username: "",
    email: "",
    phone: ""
  });

  const { fetchHandler } = useFetch();
  const { token } = useContext(AppContext);
  const history = useHistory();
  const classes = useStyles();

  const textChange = (e) => {
    const { value, name } = e.target;

    setText((prevState) => ({ ...prevState, [name]: value }));
  };

  const signupUser = (e) => {
    e.preventDefault();

    fetchHandler("/users/signup", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(text)
    })
      .then((res) => {
        if (res) {
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={signupUser} className={classes.form} autoComplete="off">
      <TextField
        label="Username"
        name="username"
        value={text.username}
        onChange={textChange}
        variant="outlined"
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={text.email}
        onChange={textChange}
        variant="outlined"
      />

      <TextField
        label="Phone Number"
        name="phone"
        type="phone"
        value={text.phone}
        onChange={textChange}
        variant="outlined"
      />

      <Button type="submit">Signup</Button>
    </form>
  );
};

export default Signup;
