-- migrate:up
CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(50) NOT NULL,
	name VARCHAR(50) NOT NULL,
	user_mail VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
)character set utf8mb4 collate utf8mb4_general_ci;
-- migrate:down
DROP TABLE users;

