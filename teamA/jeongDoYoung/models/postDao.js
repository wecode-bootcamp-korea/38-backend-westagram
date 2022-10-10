const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	  myDataSource.destroy();
  });

const createPost = async (user_id,title,content ) => {
	try {
		return await myDataSource.query(
		`INSERT INTO posts(
		    user_id,
            title,
            content
		) VALUES (?, ?, ?);
		`,
		[ user_id,title,content ]
	  );
	} catch (err) {
		const error = new Error(err.message);
		error.statusCode = 500;
		throw error;
	}
};

module.exports = {
  createPost
}