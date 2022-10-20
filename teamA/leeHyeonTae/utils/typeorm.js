const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});
    
module.exports = appDataSource


// class DataSource {
//     constructor(
//         type,
//         host,
//         port,
//         username,
//         password
//     ) {
//         this.type = type
//         this.host = host
//     }

//     async initialize() {
//         // connect to database ....

//     }

// }