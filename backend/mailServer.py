# Echo server program
import socket
import requests

HOST = ''                 # Symbolic name meaning all available interfaces
PORT = 5001              # Arbitrary non-privileged port
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(1)
while 1:
    try:
        print '=======>> mail server started on', PORT, HOST 
        conn, addr = s.accept()
        print '=======>> Connected by', addr
        while 1:
            data = conn.recv(1024)
            if not data: break
            print '=======>> data received'
            r = requests.post('http://0.0.0.0:5051/receive', data = {'key':'value'})
            conn.sendall(data)

        conn.close()
    except KeyboardInterrupt:
        print '=======>> Keyboard interrupt received'
        print '=======>> closing server'
        break