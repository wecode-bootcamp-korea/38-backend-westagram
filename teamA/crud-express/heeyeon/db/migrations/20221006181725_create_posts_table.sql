-- migrate:up
CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(3000) NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
ALTER TABLE posts ADD posting_image_url VARCHAR(3000) NULL;

-- migrate:down
DROP TABLE posts;
