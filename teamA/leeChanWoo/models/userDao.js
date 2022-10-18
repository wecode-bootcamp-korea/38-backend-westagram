const myDataSource = require('./DataSource');

const createUser = async ( name, email, password, profileImage ) => {
    try{
      return await myDataSource.query(
       `INSERT INTO users(
            name,
            email,
            password,
            profile_image
       ) VALUES (?, ?, ?, ?);
       `,
       [ name, email, password, profileImage ]);
    } catch(err) {
      const error = new Error('INVALID_DATA_INPUT');
      error.statusCode = 500;
      throw error;
    }
 };

module.exports = {
  createUser
}