const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const app = express();

const hostname = "127.0.0.1";
const port = 3000;

dotenv.config({ path: "./config/config.env" });
connectDB();

app.use(bodyParser.json());
app.use("/", require("./routes/index"));

app.listen(port, hostname, () => {
  console.log(`server is running at http://${hostname}:${port}`);
});
