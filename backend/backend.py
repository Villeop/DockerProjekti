from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host="database",
        database="notes",
        user="user",
        password="password"
    )
    return conn

@app.route('/notes', methods=['GET'])
def get_notes():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM notes;')
    notes = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(notes)

@app.route('/notes', methods=['POST'])
def add_note():
    new_note = request.json['note']
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO notes (note) VALUES (%s)', (new_note,))
    conn.commit()
    cur.close()
    conn.close()
    return '', 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
