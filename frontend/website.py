from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/docker')
def docker():
    return render_template('docker.html')

@app.route('/docker-compose')
def docker_compose():
    return render_template('docker-compose.html')

@app.route('/notes')
def notes():
    return render_template('notes.html')

notes = []

@app.route('/notes', methods=['POST'])
def save_note():
    note = request.json.get('note')
    if note:
        notes.append(note)
        return jsonify({'status': 'success'}), 200
    return jsonify({'status': 'error'}), 400

@app.route('/notes', methods=['GET'])
def get_notes():
    return jsonify(notes), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)