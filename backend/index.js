require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/index");

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Mongo DB Connection Successfull")
}).catch((err) => {
  console.log("Error In MongoDB Connection : ", err)
})

app.use('/', route);
app.get('/*', (req, res) => {
  res.status(404).send({
    status: false,
    message: "Path Not Match"
  });
})

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server Listening on ${process.env.NODE_PORT}`)
})