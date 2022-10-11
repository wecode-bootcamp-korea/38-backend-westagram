const { DataSource } = require("typeorm");

const mysqlDataSource = new DataSource({
  type: process.env.TYPOEORM_CONNECTION,
  host: process.env.TYPOEORM_HOST,
  port: process.env.TYPOEORM_PORT,
  username: process.env.TYPOEORM_USERNAME,
  password: process.env.TYPOEORM_PASSWORD,
  database: process.env.TYPOEORM_DATABASE
});

mysqlDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(() => {
    console.error("Error occurred during Data Source initialization", err);
    mysqlDataSource.destroy();
  });

const createUser = async ( name, email, profile_image, password ) => {
  try {
    return await mysqlDataSource.query(`
      INSERT INTO users
      (
        name,
        email,
        profile_image,
        password
      )
      VALUES ( ?, ?, ?, ? );`,
      [ name, email, profile_image, password ]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const emailCheck = async ( email ) => {
  try {
    const emailArr = await mysqlDataSource.query(`
      SELECT 
        email
      FROM users;`
    );
    for(let i=0; i<emailArr.length; i++) {
      if(email === emailArr[i].email) {
        throw new Error();
      }
    }
  } catch (err) {
    const error = new Error("DUPLICATE EMAIL");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { createUser, emailCheck };