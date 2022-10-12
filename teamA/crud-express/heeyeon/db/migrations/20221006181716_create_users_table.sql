-- migrate:up
CREATE TABLE users (
<<<<<<< HEAD
    id INT NOT NULL AUTO_INCREMENT,
=======
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
>>>>>>> feature/kimHeeYeon-crud
    name VARCHAR(50) NOT NULL,
    email VARCHAR(200) NOT NULL,
    profile_image VARCHAR(1000) NULL,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
<<<<<<< HEAD
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
=======
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
>>>>>>> feature/kimHeeYeon-crud
);

-- migrate:down
DROP TABLE users;
