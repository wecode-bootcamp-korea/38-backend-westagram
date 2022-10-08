const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize().then(() => {
  console.log("data source has been init");
});

const createUser = async (name, email, profileImage, password) => {
  await myDataSource.query(
    `INSERT INTO users (
            name,
            email,
            profile_image,
            password
        ) VALUES (
            ?,
            ?,
            ?,
            ?
        )`,
    [name, email, profileImage, password]
  );
};

module.exports = { createUser };
