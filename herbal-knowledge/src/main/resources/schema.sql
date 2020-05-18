CREATE TABLE IF NOT EXISTS herbal.category(
	id BIGINT PRIMARY KEY,
	name VARCHAR(30) UNIQUE
);

CREATE TABLE IF NOT EXISTS herbal.flower(
	id BIGINT PRIMARY KEY,
	name VARCHAR(30) NOT NULL UNIQUE,
	description VARCHAR(350),
	category_id BIGINT,
	picture_url VARCHAR(50),
	date_created TIMESTAMP DEFAULT NULL,
	date_updated TIMESTAMP DEFAULT NULL,
	FOREIGN KEY(category_id) REFERENCES herbal.category (id)
);