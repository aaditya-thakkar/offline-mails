import socket
import json

from utils import logger, my_concat

with open('/Users/devabnull/inout18/offline-mails/backend/constants.json') as data_file:    
    data = json.load(data_file)

HOST = data["mailReplyServer"]["host"]
PORT = data["mailReplyServer"]["port"]
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(5)
while 1:
    try:
        logger(['mail reply server started on', PORT, HOST])
        conn, addr = s.accept()
        logger(['Connected by', addr])
        while 1:
            data = conn.recv(1024)
            if not data: break
            logger(['data receive', data])
    except KeyboardInterrupt:
        logger('Keyboard interrupt received')
        logger('closing server')
        conn.close()
        logger('server closed')
        break
