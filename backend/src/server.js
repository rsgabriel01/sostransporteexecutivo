const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const routes = require("./app/routes");

//inicia o express
const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", routes);
app.use(errors());

app.listen(process.env.PORT || 3001);

console.log("Server is running...");
