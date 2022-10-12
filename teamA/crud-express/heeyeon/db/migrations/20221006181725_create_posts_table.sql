-- migrate:up
CREATE TABLE posts (
<<<<<<< HEAD
    id INT NOT NULL AUTO_INCREMENT,
=======
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
>>>>>>> feature/kimHeeYeon-crud
    title VARCHAR(100) NOT NULL,
    content VARCHAR(3000) NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
<<<<<<< HEAD
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
ALTER TABLE posts ADD posting_image_url VARCHAR(3000) NULL;
=======
    FOREIGN KEY(user_id) REFERENCES users(id)
);
>>>>>>> feature/kimHeeYeon-crud

-- migrate:down
DROP TABLE posts;
