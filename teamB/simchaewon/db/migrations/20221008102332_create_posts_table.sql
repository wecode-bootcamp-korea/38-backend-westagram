-- migrate:up
CREATE TABLE posts(
	id INT NOT NULL AUTO_INCREMENT,
	content VARCHAR(3000) NULL,
	user_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id)
)character set utf8mb4 collate utf8mb4_general_ci;
-- migrate:down
DROP TABLE posts;
