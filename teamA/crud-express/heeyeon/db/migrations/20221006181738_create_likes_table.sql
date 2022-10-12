-- migrate:up
CREATE TABLE likes (
<<<<<<< HEAD
    id INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(3000) NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY(id),
=======
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(3000) NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
>>>>>>> feature/kimHeeYeon-crud
    FOREIGN KEY(user_id) REFERENCES users(id), 
    FOREIGN KEY(post_id) REFERENCES posts(id)
);

-- migrate:down
DROP TABLE likes;
