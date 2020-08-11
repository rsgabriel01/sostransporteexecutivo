const express = require("express");

const db = require("./src/app/models");

const cors = require("cors");

const bodyParser = require("body-parser");

const { errors } = require("celebrate");

const routes = require("./src/app/routes");

//inicia o express
const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", routes);
app.use(errors());

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running. Lintening on port 3001.");
  });
});
