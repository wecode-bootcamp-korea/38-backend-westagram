-- migrate:up
CREATE TABLE likse (
		id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULl,
		PRIMARY KEY(id),
		CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id), 
		CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id) 
);

-- migrate:down
DROP TABLE likes;