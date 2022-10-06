const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dotenv = require('dotenv');

dotenv.config();
// 환경변수에 잘 적어놓았던 TypeORM 등과 관련된 수많은 내용들을 app.js에서 활용할 수 있도록 발동시키는 코드입니다.
// 이 코드가 환경변수를 활용하는 코드보다 아래쪽에 위치해있으면 에러 납니다.

const { DataSource } = require('typeorm');
// typeorm을 모듈로서 활용하기 위해 require 문법을 사용하는 모습입니다.

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPOPRM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})
// TypeORM을 require()했을 때 만들었던 DataSource라는 변수를 메소드로서 실활용할 수 있게끔 합니다.
// .env 파일의 환경변수들을 실제 접목시키고 연동시킬 수 있게 process.env라고 하는 경로를 통해서, .env 숨김파일에서 관련된 환경변수 value들을 가져옵니다.

myDataSource.initialize()
.then(() => {
    console.log('Data Source has been initialized!')
});
//TypeORM의 문법상 DB와의 연동을 실행합니다. 외부시스템과의 연동이므로 비동기 형태입니다.
// 비동기적인 처리를 Promise 객체를 활용해서 연결이 잘 되었을 때, 연결되지 않았을 때에 대한 추후 행위를 정의하고 설정할 수 있습니다.

const app = express()

app.use(express.json());
//express.json()은 외부에서 요청으로 들어온 내용 값(body)을 parsing합니다. 

// app.use(cors());
app.use(morgan('tiny'));

// app.get('/ping', (req, res) => {
//     res.json({message:'pong'});
// });

app.get('/ping', cors(), function (req, res, next) {
    res.json({ message : 'pong '})
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async() => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()