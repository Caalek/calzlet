import sqlite3

connection = sqlite3.connect('database.db')

with open('schema.sql') as f:
    connection.executescript(f.read())

cursor = connection.cursor()

# # example users
# cursor.execute("INSERT INTO users (email, password) VALUES (?, ?, ?)",
# ("Adam", "password123", "salt123"))
# cursor.execute("INSERT INTO users (email, password) VALUES (?, ?, ?)",
# ("Daniel", "password124", "salt124"))

# #example studysets
# cursor.execute("INSERT INTO studysets (user_id, studyset_name) VALUES (?, ?)", 
# (1, "Spanish B2"))
# cursor.execute("INSERT INTO studysets (user_id, studyset_name) VALUES (?, ?)", 
# (1, "French A1"))
# cursor.execute("INSERT INTO studysets (user_id, studyset_name) VALUES (?, ?)", 
# (2, "German C1"))

# #example flashcards
# cursor.execute("INSERT INTO flashcards (studyset_id, word, translation) VALUES (?, ?, ?)",
# (1, "el tiburón", "shark"))
# cursor.execute("INSERT INTO flashcards (studyset_id, word, translation) VALUES (?, ?, ?)",
# (1, "la calefacción", "heating"))


connection.commit()
connection.close()
