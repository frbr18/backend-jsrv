CREATE TABLE
IF NOT EXISTS users
(
    name varchar
(45) not null,
    email VARCHAR
(255) NOT NULL,
    password VARCHAR
(60) NOT NULL,
    date VARCHAR
(45) not null,
    UNIQUE
(email)
);

create table reports (
	_id integer primary key autoincrement,
	title varchar
(255),
	content text
);