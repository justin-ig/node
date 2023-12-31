const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');
const MemoryStore = require("memorystore")(session);


const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({
    origin: ['https://subtle-strudel-692ff2.netlify.app', 'https://node-ingeun.koyeb.app', "https://e99f-123-111-94-200.ngrok-free.app"],
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}

app.set('trust proxy', 1);
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  store: new MemoryStore({
    checkPeriod: 86400000, // 24 hours (= 24 * 60 * 60 * 1000 ms)
}),
  resave: false,
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: true,
  cookie: {
    sameSite: "none",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false ,
    //domain: process.env.NODE_ENV === "production" ? "subtle-strudel-692ff2.netlify.app" : ""
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(8000, () => {
  console.log('서버 실행 중!');
});
