const linkDB = async () => {
  const { DataSource } = require("typeorm");

  const westa_DB = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
  });
  westa_DB
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error occurred during Data Source initialization", err);
      westa_DB.destroy();
    });
};

module.exports = { linkDB };
