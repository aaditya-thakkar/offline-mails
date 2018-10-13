import socket
import requests
import json
import imaplib
import email
import re

from time import sleep
from utils import logger, my_concat

def connect_inbox():
    logger('connecting to imap')
    M = imaplib.IMAP4_SSL('imap.gmail.com')
    logger('logging')
    M.login('abhijitdev9@gmail.com', '1Gblwf!dL')
    M.select()
    return M

def extract_mail_ids(conn):
    logger('extracting mail ids')
    _, data = conn.search(None, 'ALL')
    return data[0].split() # here ids are wrapped in array

def fetch_mail_for_id(conn, ids):
    logger(['fetching mail for id', ids])
    typ, data = conn.fetch(ids, '(RFC822)')
    # print 'Message %s\n%s\n' % (id, data[0][1])
    # original = email.message_from_string(data[0][1])
    logger(['fetched mail for', data])
    return data

def parse_mail_from(fromStr):
    mail_from = re.search("<(.+?)>", fromStr).group(1)
    logger(mail_from)
    return mail_from

def parse_mail(mailStr):
    logger('parsing mail')
    original = email.message_from_string(mailStr)
    parsed_mail_from = parse_mail_from(original['From'])
    parsed_mail = {
        "from": parsed_mail_from,
        "subj": original['Subject'],
        "date": original['Date']
    }
    for part in original.walk():
        if part.get_content_type() == "text/plain":
            parsed_mail["body"] = part.get_payload(decode=True)
        else:
            continue
    
    logger(['parsed mail is', json.dumps(parsed_mail)])
    return parsed_mail


def connect_sms_server():
    with open('/Users/devabnull/inout18/offline-mails/backend/constants.json') as data_file:    
        data = json.load(data_file)

    HOST = data["smsServer"]["host"]
    PORT = data["smsServer"]["port"]
    receiveEndpoint = data["smsServer"]["receiveEndpoint"] 

    smsServerUrl = my_concat(['http://', HOST, ':', PORT, '/', receiveEndpoint])
    return smsServerUrl

def ping_sms(smsServerUrl):
    logger(['pinging', smsServerUrl])
    return requests.post(smsServerUrl, data = {'key':'value'})

def close_server():
    logger('Keyboard interrupt received')
    logger('closing server')

# cnt =1
# while 1:
#     try:
#         # print '=======>> mail server started on', PORT, HOST 
#         # conn, addr = s.accept()
#         # print '=======>> Connected by', addr
#         while cnt:
#             cnt = cnt -1
#             # data = conn.recv(1024)
#             # if not data: break
#             # print '=======>> data received'
            
#             # conn.sendall(data)

#     except KeyboardInterrupt:
#         close_server()
#         break
mailConn = connect_inbox()
try:
    mailIds = extract_mail_ids(mailConn)
    # logger(['extracted mail ids', mailIds[-50:]])
    mail_ids_to_fetch = mailIds[-5] # recent mail ids in the start of list
    fetched_mails = fetch_mail_for_id(mailConn, str(mailIds[-2]) +':'+str(mailIds[-1]))
    # logger(['fetched mails here are', fetched_mails])
    # for mail in fetched_mails:
    #     logger(['mail to parse', mail])
        # parsed_mail = parse_mail(mail[1])
except KeyboardInterrupt:
    close_server()
# fetch_mail_for_id(mailIds[0])

