from flask import Flask, jsonify, request
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS
import random
import time
import database as db
import sys
from bson.json_util import dumps

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def hello_world():
    return 'Hello, World!'

numbers = []
@socketio.on('subscribe')
def add_numbers():
    while True:
        # numbers.append(random.randint(0,100))
        emit('numbers', time.ctime())
        time.sleep(1)

questions = [{'this': 0, 'next': 1, 'text': '2 + 2 = ?', 'answers': []}, {'this': 1, 'next': 2, 'text': 'Capital of India?', 'answers': []}, {'this': 2, 'next': 0, 'text': 'Who discovered gravity?', 'answers': []}]

@app.route('/questions')
def get_questions():
    return jsonify(questions)

@socketio.on('questions')
def next_question(data):
    emit('question', questions[int(data)])

@socketio.on('answer')
def add_answer(data):
    questions[data['this']]['answers'].append(data['text'])
    emit('new_response', questions[data['this']])

@app.route('/quiz', methods=['POST'])
def get_quiz():
    payload = request.json
    print(payload, file=sys.stdout)
    quiz = db.find_quiz(payload['id'])
    return dumps(quiz)

if __name__ == '__main__':
    socketio.run(app)