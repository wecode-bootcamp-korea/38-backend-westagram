-- migrate:up
ALTER TABLE likes ADD UNIQUE INDEX (user_id, post_id);

-- migrate:down
DROP TABLE likes;
