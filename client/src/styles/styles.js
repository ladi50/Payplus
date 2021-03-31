import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  table: {
    margin: "40px auto"
  },
  head: {
    backgroundColor: "#33cc33",
    "& *": {
      color: "white",
      border: "1px solid white"
    }
  },
  row: {
    backgroundColor: "#007BB0",
    "& td": {
      color: "white",
      border: "1px solid white"
    }
  },
  button: {
    margin: "30px auto",
    display: "block"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: 300,
    border: "1px solid lightgray",
    borderRadius: "20px",
    padding: "20px",
    width: "250px",
    margin: "40px auto"
  }
});
