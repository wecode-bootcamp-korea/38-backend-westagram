const postDao=require("../models/postDao");

const upload=async(title, content, userName, postImage)=>{
    
    const createPost = await postDao.createPost(
        title,
        content,
        userName,
        postImage
    );


    return createPost;
};

const readall = async ()=>{
    return await postDao.getPosts();
}

const update = async(postId, contentChange)=>{
    const updatedPost = await postDao.updatePost(
        postId, contentChange
    );
    return await updatedPost;
}


module.exports = {
    upload,
    readall,
    update
};


//데이터 수정 UPDATE table_name SET name = '테스트 변경', country = '대한민국' WHERE id = 1105;
// 출처: https://extbrain.tistory.com/47 [확장형 뇌 저장소:티스토리]