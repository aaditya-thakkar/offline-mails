import socket
import requests
import json
import imaplib
import email
import re
import time

from time import sleep
from utils import logger, my_concat

def connect_inbox():
    logger('connecting to imap')
    M = imaplib.IMAP4_SSL('imap.gmail.com')
    logger('logging')
    M.login('abhisandhyasp.ap@gmail.com', '*******')
    M.select()
    return M

def extract_mail_ids(conn):
    logger('extracting mail ids')
    _, data = conn.search(None, 'UNSEEN')
    return data[0].split() # here ids are wrapped in array

def fetch_mail_for_id(conn, ids):
    # logger(['fetching mail for id', ids])
    typ, data = conn.fetch(ids, '(RFC822)')
    logger(['fetched mail for', ids, data[1]])
    return data

def split_date_str(dateStr):
    return dateStr.split(' ' + re.search('[\\+\\-]', dateStr).group(0))[0]

def adaptTime(date):
    logger(['date to adapt', date])
    pattern = '%a, %d %b %Y %H:%M:%S'
    try:
        return int(time.mktime(time.strptime(split_date_str(date), pattern))) *1000
    except:
        pattern = '%d %b %Y %H:%M:%S'
        return int(time.mktime(time.strptime(split_date_str(date), pattern))) *1000

def parse_mail_from(fromStr):
    logger(fromStr)
    reg_grp = re.search("<(.+?)>", fromStr)
    mail_from = fromStr
    if reg_grp is not None:
        mail_from = reg_grp.group(1)
    return mail_from

def parse_mail(mailStr):
    original = email.message_from_string(mailStr)
    parsed_mail_from = parse_mail_from(original['From'])
    parsed_mail_to = parse_mail_from(original['To'])
    parsed_mail = {
        "from": parsed_mail_from,
        "sub": original['Subject'],
        "to": parsed_mail_to,
        "date": adaptTime(original['Date']),
        "phoneNumber": '+919722761117'
    }
    for part in original.walk():
        if part.get_content_type() == "text/plain":
            parsed_mail["body"] = part.get_payload(decode=True)
        else:
            continue
    
    logger(['parsed mail time is', original['Date'], adaptTime(original['Date'])])
    return parsed_mail

def parse_mail_list(fetched_mails):
    cnt = 0 # hack in iterating, array type [mail, flags....]
    mails = []
    for mail in fetched_mails:
        # toPrint = if mail[0]: mail[0]
        # only store 0,2,4.. 
        if cnt%2 !=1 and ( cnt is not len(fetched_mails)-1 and re.search('\\Seen', fetched_mails[cnt+1]) is not None):
            logger(['mail to parse', mail[0]])
            mails.append(parse_mail(mail[1]))
        cnt +=1
    return mails

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

def db_entry(mails):
    logger(['put in db', mails])
    return requests.post('http://localhost:8082/mail/insert', json = mails)

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
    fetched_mails = fetch_mail_for_id(mailConn, str(mailIds[-10]) +':'+str(mailIds[-1]))
    parsed_mail_list = parse_mail_list(fetched_mails)
    db_entry(parsed_mail_list)
    logger(['parsed mail list', len(parsed_mail_list)])
except KeyboardInterrupt:
    close_server()
# fetch_mail_for_id(mailIds[0])

