-- migrate:up
ALTER TABLE likes ADD CONSTRAINT togglelikes UNIQUE (user_id, post_id);

-- migrate:down
ALTER TABLE likes DROP INDEX togglelikes;
