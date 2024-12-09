from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    cur.execute('INSERT INTO notes (note) VALUES (%s) RETURNING id', (new_note,))
    note_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'id': note_id, 'note': new_note}), 201

@app.route('/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    updated_note = request.json['note']
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE notes SET note = %s WHERE id = %s', (updated_note, note_id))
    conn.commit()
    cur.close()
    conn.close()
    return '', 204

@app.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM notes WHERE id = %s', (note_id,))
    conn.commit()
    cur.close()
    conn.close()
    return '', 204

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)