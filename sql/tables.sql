CREATE TABLE players(
id SERIAL PRIMARY KEY,
username TEXT NOT NULL UNIQUE,
score INT
);
CREATE TABLE countries(
id SERIAL PRIMARY KEY,
countryname TEXT NOT NULL UNIQUE,
moreinfo TEXT NOT NULL,
flag TEXT
);
CREATE TABLE questions(
id SERIAL PRIMARY KEY,
question TEXT NOT NULL UNIQUE,
answer TEXT NOT NULL,
options TEXT[],
country_id INT REFERENCES countries(id);
);
CREATE TABLE phrases(
id SERIAL PRIMARY KEY,
phrase TEXT NOT NULL UNIQUE
country_id INT REFERENCES countries(id);
)

