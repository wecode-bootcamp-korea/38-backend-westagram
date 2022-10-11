require('dotenv').config();
const http = require('http');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

app.get('/ping', (req, res) => {
    res.status(201).json({message: 'pong 연결 완료 '});
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
    try {
        server.listen(PORT, ()=> console.log(`!!!!!!!!!!!server listening on port ${PORT}!!!!!!!`));
    }
    catch(err){
        console.error(err);
    }
};

start();


// app.get('/posts-from-user/:userid', async (req,res)=>{

//     const userid  = parseInt(req.params.userid);

//     await Promise.all([
//         appDataSource.query(
//             `SELECT
//                 posts.id AS postingId,
//                 posts.title AS postingTitle,
//                 posts.content AS postingContent
//             FROM posts
//             WHERE user_id= ${userid};
//             `, 
//         ),
//         appDataSource.query(
//             `SELECT
//                 users.id AS userId,
//                 users.profile_image AS userProfileImage
//             FROM users
//             WHERE id = ${userid};
//             `
//         )])
//         .then(([postingsResult, userResult])=>{
//             userResult[0]['postings'] = postingsResult;
//             res.status(200).json({ "data" : userResult[0] });
//         })
    
// })
