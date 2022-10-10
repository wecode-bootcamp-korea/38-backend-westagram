const { DataSource } = require('typeorm');

const westa_DB = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

westa_DB.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	  westa_DB.destroy();
  });


const createUser = async ( name, email, password, profileImage ) => {
	try {
		await westa_DB.query(
			`INSERT INTO users(
				name,
				email,
				password,
				profile_image
				) VALUES (?, ?, ?, ?);
				`,
				[ name, email, password, profileImage ]
				);
	} 
    
    catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

module.exports = {
  createUser
}