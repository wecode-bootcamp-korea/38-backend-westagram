const dataSource = require('./dataSource')

const createUser = async (name, email, password, profile_image) => {
    try {
        return await dataSource.AppDataSource.query(
            `INSERT INTO users(
                name,
                email,
                password,
                profile_image
            ) VALUES (?, ?, ?, ?);`,
            [name, email, password, profile_image]
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
