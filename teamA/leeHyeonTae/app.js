// 환경변수 필요한 dotenv 최상위로 올리는게 좋다(cuz: 가독성)
require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const morgan = require('morgan');


const app = express();


const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);


      const start = async () => {
        try {
          app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
        } catch (err) {
          console.error(err);
        }
      }
      start();