// express 및 라이브러리 import
const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

// express를 app에 담아 method 사용이 가능해진다.
const app = express();
// dotenv를 사용할 수 있게 해준다.
dotenv.config();
// 미들웨어로써 다양한 라이브러리를 use를 통해 등록할 수 있다.
// cors로 다른 도메인간 엄격한 통신을 완화시켜준다.
// morgan을 통해 log관리를 해줄 수 있다.
app.use(cors());
app.use(morgan("dev"));
// app을 http통신을 이용한 서버로 만들어준다.
const server = http.createServer(app);

const PORT = process.env.PORT;

app.get("/ping", (req, res, next) => {
  res.json({ message: "success" });
});

const start = () => {
  server.listen(PORT, () => {
    console.log(`Open Server with ${PORT}`);
  });
};

start();
