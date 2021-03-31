require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const usersRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/users", usersRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => app.listen(process.env.PORT || 8000))
  .catch((err) => console.log(err));
