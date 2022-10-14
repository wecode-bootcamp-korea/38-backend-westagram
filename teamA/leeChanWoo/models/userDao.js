const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  });

const createUser = async ( name, email, password, profileImage ) => {
     return await myDataSource.query(
     `INSERT INTO users(
          name,
          email,
          password,
          profile_image
     ) VALUES (?, ?, ?, ?);
     `,
     [ name, email, password, profileImage ]);
};

module.exports = {
  createUser
}