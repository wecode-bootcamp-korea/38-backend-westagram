require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const appDataSource = require('./utils/typeorm')

const app = express();


const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);


      const start = async () => {
        try {
          app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
          appDataSource.initialize()
          .then( () => {
            console.log('Data Source has been initialzed');
            })
            .catch( (err) => {
                console.error('error occured during data source initalization',err);
                appDataSource.destroy();
            })
        } catch (err) {
          console.error(err);
        }
      }
      start();