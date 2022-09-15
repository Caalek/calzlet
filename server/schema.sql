DROP TABLE IF EXISTS studysets;
DROP TABLE IF EXISTS flashcards;

CREATE TABLE studysets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studyset_name name TEXT,
    studyset_desc TEXT,
    edit_password TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE flashcards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studyset_id INTEGER NOT NULL,
    word TEXT NOT NULL,
    translation TEXT NOT NULL,
    FOREIGN KEY (studyset_id) REFERENCES studysets (id)
); 