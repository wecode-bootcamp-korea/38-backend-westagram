-- migrate:up
CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT,	
    title VARCHAR(200) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    user_id INT NOT NULL,
    post_image VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE posts;