-- migrate:up
    CREATE TABLE posts (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        content VARCHAR(3000) NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT posts_users_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
    );

-- migrate:down
DROP TABLE posts;
