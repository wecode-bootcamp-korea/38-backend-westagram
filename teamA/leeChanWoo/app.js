const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv').config();

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
        console.log("Data Source has been initialized!")
    })

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());


// health cheak
app.get('/ping', function (req, res, next) {
     res.json({message: 'pong'});
});

// sign-up
app.post('/users', async (req, res) => {
	const { name, email, profile_image, password } = req.body
    
	await myDataSource.query(
		`INSERT INTO users(
		    name,
		    email,
            profile_image,
            password
		) VALUES (?, ?, ?, ?);
		`,
		[ name, email, profile_image, password ]
	); 
     res.status(201).json({ message : "userCreated" });
});

const PORT = process.env.PORT;

app.listen(PORT, function () {
     console.log('server listening on port 3000');
});
