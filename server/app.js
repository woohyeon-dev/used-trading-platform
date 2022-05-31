const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./models');

dotenv.config();
const homeRouter = require('./routes/home');
const boardRouter = require('./routes/board');
const marketRouter = require('./routes/market');

const app = express();
app.set('port', process.env.PORT || 5000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB서버에 접속 완료');
  })
  .catch(err => {
    console.error(err);
  });

// middleware
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// router
app.use('/', homeRouter);
app.use('/board', boardRouter);
app.use('/market', marketRouter);

// 404 error middleware
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다. `);
  error.status = 404;
  next(error);
});

// error middleware
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
