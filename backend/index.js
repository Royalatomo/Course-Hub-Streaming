const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const url = process.env.MONGO_LINK;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const con = mongoose.connection;
con.on("error", () => console.log("DB connection Error"));
con.on("open", () => console.log("Connected to DB"));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", require("./user-route"));
app.use("/", require("./course-route"));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));