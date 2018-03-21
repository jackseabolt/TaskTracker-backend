
-- psql -f ./migrations/001.sql ADRESSS

BEGIN; 

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username TEXT NOT NULL,
    password TEXT NOT NULL
); 

CREATE TABLE boards (
    name TEXT NOT NULL, 
    id SERIAL PRIMARY KEY, 
    user_id INTEGER REFERENCES users ON DELETE CASCADE NOT NULL
);

CREATE TABLE completed (
    id SERIAL PRIMARY KEY, 
    value TEXT NOT NULL, 
    board_id INTEGER REFERENCES boards ON DELETE CASCADE NOT NULL 
); 

CREATE TABLE todo (
    id SERIAL PRIMARY KEY, 
    value TEXT NOT NULL, 
    board_id INTEGER REFERENCES boards ON DELETE CASCADE NOT NULL 
); 

COMMIT; 