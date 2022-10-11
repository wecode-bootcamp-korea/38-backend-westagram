const {DataSource} = require("typeorm");

const westa_DB= new DataSource({
    type:process.env.TYPEORM_CONNECTION,
    host:process.env.TYPEORM_HOST,
    password:process.env.TYPEORM_PASSWORD,
    port:process.env.TYPEORM_PORT,
    database:process.env.TYPEORM_DATABASE,
    username:process.env.TYPEORM_USERNAME
})

westa_DB.initialize()
    
    .then(()=>{
        console.log("DATA SOURCE HAS BEEN INITIALIZED!");
    })
    .catch((err)=>{
        console.error("Error ocurred during Data Source initialization", err);
        westa_DB.destroy();
    });


    const createPost=async(title, content, userName,postImage)=>{
        try{
            const id=await westa_DB.query('SELECT id FROM users WHERE users.name=? ;', [userName]);
            await westa_DB.query('INSERT INTO posts (title, content, user_id, post_image) VALUES (?,?,?,?)',
            [title, content, id[0].id,postImage]
            );
        }

        catch(err){
            const error = new Error ("INVALID_DATA_INPUT");
            error.statusCode = 500;
            throw error;
        }
    };

    const getPosts = async ()=>{
        try{
            return await westa_DB.query("SELECT * FROM posts");
        }

        catch(err){
            const error = new Error ("INVALID_DATA_INPUT");
            error.statusCode = 500;
            throw error;
        }
    }

    const updatePost=async(postId, contentChange)=>{
        try{
            await westa_DB.query("UPDATE posts SET content=? WHERE id=?",
            [contentChange, postId]
            );
            return await westa_DB.query(
                "SELECT users.id AS userId, users.name as userName, posts.id as postingId, posts.title as postingTitle, posts.content AS postingContent from users,posts where users.id=posts.user_id AND posts.id=?",
                [postId]
                )
            
        }

//         {
//             "data" : {
//                 "userId"           : 1,
//                 "userName"         : "weCode",
//                     "postingId"        : 1,
//                     "postingTitle"     : "간단한 HTTP API 개발 시작!",
//                 "postingContent"   : "기존과 다르게 수정한 내용입니다."
//             }
//         }
// Zz        

        catch(err){
            const error = new Error ("INVALID_DATA_INPUT");
            error.statusCode = 500;
            throw error;
        }
    };


    module.exports={createPost, getPosts, updatePost};