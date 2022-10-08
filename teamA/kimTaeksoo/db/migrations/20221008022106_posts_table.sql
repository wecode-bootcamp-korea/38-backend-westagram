-- migrate:up
ALTER TABLE posts ADD posting_image_url VARCHAR(200) NOT NULL

-- migrate:down
DROP TABLE posts;
