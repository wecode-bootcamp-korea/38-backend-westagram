const postDao = require('../models/postDao');


const posts = async ( title, content, url_image, user_id) => {
    
    const createPost = await postDao.createPost(
        title,
        content,
        url_image,
        user_id
    );

    return createPost;

};

const search = async () => {
    const searchPost = await postDao.searchPost();

    return searchPost;
}


const specificPostSearch = async (id) => {
    const specificSearch = await postDao.specificSearchPost(id);

    return specificSearch;
}

const specificUserSearch = async (id) => {
    const specificUserSearch = await postDao.specificSearchUserImgUrl(id);

    return specificUserSearch;
}


const resultSpecific = async (a) => {
    const id = Number(a);
    const userSearchResult =  await postDao.specificSearchUserImgUrl(id);
    const postSearchResult =  await postDao.specificSearchPost(id);
    const resultPostArray = [];
    
    resultPostArray.push(postSearchResult);
    console.log(postSearchResult);
    console.log(resultPostArray);
    const resultObject = { 
        "userId" : id,
        "userProfileImage": userSearchResult,
        "posting" : resultPostArray };
    
    return resultObject;
}


const update = async (userId, postId, title, content) => {
    const updatePost = await postDao.updatePost(userId, postId, title, content);

    return updatePost;
}

const deletes = async (deleteId) => {
    const deletes = await postDao.deletePost(deleteId);

    return deletes;
}

module.exports = {
    posts,search,specificPostSearch,specificUserSearch,resultSpecific,update,deletes
}


