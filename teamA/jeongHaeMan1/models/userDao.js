const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
        myDataSource.destroy()
    })

const createUser = async ( name, email, password, profileImage ) => {
    try {
        return await myDataSource.query(
        `INSERT INTO users(
            name,
            email,
            password,
            profile_image
        ) VALUES (?, ?, ?, ?);
        `,
        [ name, email, password, profileImage ]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createUser
}