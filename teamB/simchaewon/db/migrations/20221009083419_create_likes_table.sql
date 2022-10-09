-- migrate:up
CREATE TABLE likes(
	id INT NOT NULL AUTO_INCREMENT,
    user_name INT NOT NULL,
    post_name INT NOT NULL,
	PRIMARY KEY (id)
);

-- migrate:down

DROP TABLE likes;