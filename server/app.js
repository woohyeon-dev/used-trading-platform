const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

// dotenv 실행
// dotenv를 통해 SECRET KEY를 받는 코드보다 위에 위치해야한다.
dotenv.config();

const homeRouter = require('./routes/home');
const boardRouter = require('./routes/board');
const marketRouter = require('./routes/market');
const authRouter = require('./routes/auth');

const app = express();
app.set('port', process.env.PORT || 5000); // 포트 설정

// 이 코드 발견 시 시퀄라이즈 실행
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB서버에 접속 완료');
  })
  .catch(err => {
    console.error(err);
  });

passportConfig();

// middleware
app.use(morgan('dev')); // 개발모드로 로깅

// 클라이언트에서 보내준 데이터를 json으로 파싱해서 req.body에 데이터를 넣어주는 역할
app.use(express.json());

// extended 객체 안에 객체를 파싱할 수 있게 하려면 true
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true, // 단 아래 속성 true일 경우는 주소로 적어야한다.(보안강화)
    credentials: true, // front, back 간 쿠키 공유
  })
);
// cookieParser 설정에 비밀키를 넣어주자.
// cookieParser를 사용하게되면 req.cookies로 접근이 가능하다.
app.use(cookieParser(process.env.COOKIE_SECRET));

// session 설정
app.use(
  session({
    resave: false, // false 고정
    saveUninitialized: false, // false 고정
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true, // 항상 true(자바스크립트로 진입 불가 - XXS 공격 방지)
      secure: false,
      maxAge: 1000 * 60 * 60 * 4, // 유효기간 4시간
    },
    // name의 기본값 - connect_sid
  })
);
// 아래 2개는 session 아래로 적어주자
app.use(passport.initialize()); // passport 초기화 미들웨어
// passport.session()이 실행될 때 deserializeUser 실행됨
app.use(passport.session()); // 앱에서 영구 로그인을 사용한다면 추가하자

// router
app.use('/', homeRouter);
app.use('/board', boardRouter);
app.use('/market', marketRouter);
app.use('/auth', authRouter);

// 404 error middleware
app.use((req, res, next) => {
  console.log('404 에러');
  res.status(404).send('Not Found');
});

// error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
