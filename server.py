from flask import Flask
from flask_socketio import SocketIO, emit, send
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*', logger=True, engineio_logger=True)

@app.route('/')
def index():
    return "Hi from Flask"

@socketio.on('send_message')
def message(data):
    emit('receive_message', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)