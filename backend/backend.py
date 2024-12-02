from flask import Flask, jsonify, request
import psycopg2

app = Flask(__name__)

# Tietokantayhteys
conn = psycopg2.connect(
    host="database",
    database="notes",
    user="user",
    password="password"
)

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the backend API!"})

@app.route('/notes', methods=['GET'])
def get_notes():
    cur = conn.cursor()
    cur.execute("SELECT * FROM notes;")
    rows = cur.fetchall()
    cur.close()
    return jsonify(rows)

@app.route('/notes', methods=['POST'])
def add_note():
    new_note = request.json.get('note')
    cur = conn.cursor()
    cur.execute("INSERT INTO notes (content) VALUES (%s)", (new_note,))
    conn.commit()
    cur.close()
    return jsonify({"message": "Note added successfully!"}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

cur = conn.cursor()
cur.execute("""
    CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL
    );
""")
conn.commit()
cur.close()
