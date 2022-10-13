-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT likes_user_id_fkby FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT likes_post_id_fkby FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE likes;