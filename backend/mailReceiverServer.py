import socket
import requests
import json

from utils import logger, my_concat

with open('/Users/devabnull/inout18/offline-mails/backend/constants.json') as data_file:    
    data = json.load(data_file)

HOST = data["smsServer"]["host"]
PORT = data["smsServer"]["port"]
receiveEndpoint = data["smsServer"]["receiveEndpoint"] 

smsServerUrl = my_concat(['http://', HOST, ':', PORT, '/', receiveEndpoint])

cnt =1
while 1:
    try:
        # print '=======>> mail server started on', PORT, HOST 
        # conn, addr = s.accept()
        # print '=======>> Connected by', addr
        while cnt:
            cnt = cnt -1
            # data = conn.recv(1024)
            # if not data: break
            # print '=======>> data received'
            logger(['pinging', smsServerUrl])
            r = requests.post(smsServerUrl, data = {'key':'value'})
            # conn.sendall(data)

    except KeyboardInterrupt:
        logger('Keyboard interrupt received')
        logger('closing server')
        break