import bcrypt
import sqlite3
from flask import Flask, request, Response

def get_db_connection():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

app = Flask(__name__)


@app.route("/studysets", methods=["CREATE"])
def studysets_create():
    studyset_name = request.get_json()["studyset_name"]
    studyset_desc = request.get_json()["studyset_desc"]
    edit_password = request.get_json()["edit_password"]
    conn = get_db_connection()
    conn.execute("INSERT INTO studysets(studyset_name, studyset_desc, edit_password) VALUES (?, ?, ?)",
    (studyset_name, studyset_desc, edit_password))
    conn.commit()
    conn.close()
    return Response(status=201) #created 

# delete set
@app.route("/studysets", methods=["DELETE"])
def studysets_delete():
    pass

# create flashcard
@app.route("/flashcards", methods=["CREATE"])
def flashcards_create():
    studyset_id = request.get_json()["studyset_id"]
    word = request.get_json()["word"]
    translation = request.get_json()["translation"]
    conn = get_db_connection()
    conn.execute("INSTERT INTO flashcards(studyset_id, word, translation) VALUES (?, ?, ?)", (
        studyset_id, word, translation
    ))
    conn.commit()
    conn.close()
    return Response(status=201) #created 

# delete flashcard
@app.route("/flashcards", methods=["DELETE"])
def flashcards_delete():
    pass

app.run(debug=True)