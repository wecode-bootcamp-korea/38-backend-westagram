const http = require("http");
const express = require("express");
const cors =  require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
dotenv.config()
const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})
myDataSource.initialize()
.then(()=> {
    console.log("Data Source has been initialized!");
});

app = express();
app.use(express.json());
//app.use(cors());
app.use(morgan('dev'));
// app.get("/ping", (req, res) => {
//      res.json({message : "pong"});
// });
app.get("/ping", cors(), (req, res, next) => {
    res.json({message : "pong"});
});


app.post("/signup", cors(), (req, res, next) => {
// 회원가입 기능을 개발한다.
/*
  목적 : 우리 서비스에서 회원가입 기능은 email, 비밀번호를 클라인언트(프론트)에서 http request message로
        받아서, 데이터베이스 내의 users 테이블에 데이터를 저장한다. 그리고 http response message를
        만들어서 반환해준다.
  STEP 1. INPUT
          - http request startline : POST http://127.0.0.1:8000/signup
          - http method : POST (데이터를 저장하라는 요청의 의미이기 때문에 HTTP METHOD는 POST를 사용한다.)
          - http request target : /회원가입 (/signup)
          - http request body :
            {
                "email" : "test@gamil.com",
                "password" : "password"
            }
  STEP 2. INPUT으로 회원 가입에 필요한 주요 로직 (if, for, ... javascript 코드)
          - 요청받은 INPUT 데이터를 users 테이블에 데이터를 저장한다.
          - 요청받은 INPUT 데이터는 어디서 얻을 수 있지?
            -> callback 함수에 전달된 req 객체에서 body 데이터를 꺼내올 수 있겠다. (req.body)
          - 요청받은 INPUT 데이터를 users 테이블에 저장하려면 어떻게 해야되지?
            -> 뭔지는 모르겠지만, 테이블에 데이터를 저장할 수 있도록 도와주는 코드가 필요하다.
            -> myDataSource 객체를 활용해서 데이터를 저장할 수 있겠다?!

  STEP 3. OUTPUT
          - "성공적으로 회원가입 했습니다." 메시지 반환
            {
                "message" : "성공적으로 회원가입 했습니다."
            }
*/
})



app.get("/회원가입", cors(), (req, res, next) => {
// 로그인 기능을 개발한다.
/*
  목적 : 우리 서비스에서 회원가입 기능은 email, 비밀번호를 클라인언트(프론트)에서 http request message로
        받아서, 데이터베이스 내의 users 테이블에 데이터를 저장한다. 그리고 http response message를
        만들어서 반환해준다.
  STEP 1. INPUT
          - http request startline : POST http://127.0.0.1:8000/signup
          - http method : POST (데이터를 저장하라는 요청의 의미이기 때문에 HTTP METHOD는 POST를 사용한다.)
          - http request target : /회원가입 (/signup)
          - http request body :
            {
                "email" : "test@gamil.com",
                "password" : "password"
            }
  STEP 2. INPUT으로 회원 가입에 필요한 주요 로직 (if, for, ... javascript 코드)
          - 요청받은 INPUT 데이터를 users 테이블에 데이터를 저장한다.
          - 요청받은 INPUT 데이터는 어디서 얻을 수 있지?
            -> callback 함수에 전달된 req 객체에서 body 데이터를 꺼내올 수 있겠다. (req.body)
          - 요청받은 INPUT 데이터를 users 테이블에 저장하려면 어떻게 해야되지?
            -> 뭔지는 모르겠지만, 테이블에 데이터를 저장할 수 있도록 도와주는 코드가 필요하다.
            -> myDataSource 객체를 활용해서 데이터를 저장할 수 있겠다?!

  STEP 3. OUTPUT
          - "성공적으로 회원가입 했습니다." 메시지 반환
            {
                "message" : "성공적으로 회원가입 했습니다."
            }
*/ 
})

app.get("/회원가입", cors(), (req, res, next) => {
// 게시물 등록 기능을 개발한다.
/*
  목적 : 우리 서비스에서 회원가입 기능은 email, 비밀번호를 클라인언트(프론트)에서 http request message로
        받아서, 데이터베이스 내의 users 테이블에 데이터를 저장한다. 그리고 http response message를
        만들어서 반환해준다.
  STEP 1. INPUT
          - http request startline : POST http://127.0.0.1:8000/signup
          - http method : POST (데이터를 저장하라는 요청의 의미이기 때문에 HTTP METHOD는 POST를 사용한다.)
          - http request target : /회원가입 (/signup)
          - http request body :
            {
                "email" : "test@gamil.com",
                "password" : "password"
            }
  STEP 2. INPUT으로 회원 가입에 필요한 주요 로직 (if, for, ... javascript 코드)
          - 요청받은 INPUT 데이터를 users 테이블에 데이터를 저장한다.
          - 요청받은 INPUT 데이터는 어디서 얻을 수 있지?
            -> callback 함수에 전달된 req 객체에서 body 데이터를 꺼내올 수 있겠다. (req.body)
          - 요청받은 INPUT 데이터를 users 테이블에 저장하려면 어떻게 해야되지?
            -> 뭔지는 모르겠지만, 테이블에 데이터를 저장할 수 있도록 도와주는 코드가 필요하다.
            -> myDataSource 객체를 활용해서 데이터를 저장할 수 있겠다?!

  STEP 3. OUTPUT
          - "성공적으로 회원가입 했습니다." 메시지 반환
            {
                "message" : "성공적으로 회원가입 했습니다."
            }
*/
})
const server = http.createServer(app);
const PORT = process.env.PORT;
const start = async () => {
     server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}
start()