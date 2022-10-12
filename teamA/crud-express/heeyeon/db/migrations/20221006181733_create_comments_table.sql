-- migrate:up
CREATE TABLE comments (
<<<<<<< HEAD
    id INT NOT NULL AUTO_INCREMENT,
=======
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
>>>>>>> feature/kimHeeYeon-crud
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
<<<<<<< HEAD
    PRIMARY KEY(id),
=======
>>>>>>> feature/kimHeeYeon-crud
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);

-- migrate:down
DROP TABLE comments;
