-- migrate:up
ALTER TABLE posts ADD posting_img_url VARCHAR(3000) NULL;

-- migrate:down
ALTER TABLE posts DROP posting_img_url;
