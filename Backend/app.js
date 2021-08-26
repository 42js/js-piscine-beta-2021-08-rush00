require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const passportConfig = require("./passport");
const sequelize = require('./models').sequelize;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
sequelize.sync();


const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize()); //요청 req 객체에 passport 설정
passportConfig();

app.use(cors(corsOptions));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.use((req, res, next) => {
//     const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
//     error.status = 404;
//     next(error);
// })

// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;
