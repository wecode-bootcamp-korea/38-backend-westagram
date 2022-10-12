-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    CONSTRAINT likes_user_id_fkey FOREIGN KEY user_id REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT likes_post_id_fkey FOREIGN KEY post_id REFERENCES posts(id) ON DELETE CASCADE
)

-- migrate:down
DROP TABLE likes