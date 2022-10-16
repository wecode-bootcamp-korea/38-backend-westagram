-- migrate:up
ALTER TABLE likes DROP content;

-- migrate:down
ALTER TABLE likes ADD content VARCHAR(3000) NULL;