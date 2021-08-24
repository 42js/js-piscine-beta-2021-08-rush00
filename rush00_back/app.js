const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./auth/controller.js");
const board = require("./board/controller.js");
const comment = require("./comment/controller.js");
const profile = require("./profile/controller.js");
const { sequelize } = require("./models");

dotenv.config();
sequelize.sync();

const app = express();
app.use(
  cors({
    origin: process.env.FRONT_CROSS_ORIGIN,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(process.env.ENDPOINT_AUTH, auth);
app.use(auth.jwtGuards);
app.get(
  `${process.env.ENDPOINT_AUTH}${process.env.ENDPOINT_AUTH_SIGNOUT}`,
  auth.signOut
);
app.use(process.env.ENDPOINT_BOARD, board);
app.use(process.env.ENDPOINT_PROFILE, profile);
app.use(comment);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}/`);
});
