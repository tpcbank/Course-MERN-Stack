const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const blogRoute = require("./routes/blog.js");
const authRoute = require("./routes/auth.js");

const app = express();

//connect Cloud Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => console.log("Connect Database Success"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// route
app.use("/api", blogRoute);
app.use("/api", authRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`start server in port ${port}`));
