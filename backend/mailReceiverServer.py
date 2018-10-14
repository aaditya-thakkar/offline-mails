import socket
import requests
import json
import imaplib
import email
import re
import time

from email.header import decode_header
from time import sleep
from utils import logger, my_concat

user_id_access_token = {}

def get_user_list():
    users = requests.get('http://localhost:8082/users').json()
    verified_users = []
    for user in users:
        if user['verified'] is True:
            verified_users.append(user)
    logger(['verified users', verified_users])
    return verified_users


def xoauth_authenticate(emailId, access_token):
    logger([access_token, emailId])
    def _auth(*args, **kwargs):
        return 'user=%s\1auth=Bearer %s\1\1' % (emailId, access_token)
    return 'XOAUTH2', _auth

def refresh_token(tokens):
    logger('refreshing tokens')
    r = requests.post(
        'https://www.googleapis.com/oauth2/v4/token',
        headers={'content-type': 'application/x-www-form-urlencoded'},
        data={
            'grant_type': 'refresh_token',
            'client_id': '379366710827-j826dg3jhdius4vin7e712hnm6gmek7j.apps.googleusercontent.com',
            'client_secret': 'CEdtjXJSgxsMsAdvLKQL4e24',
            'refresh_token': tokens['refresh_token']
        }
    )
    access_token = r.json()['access_token']
    logger(['latest access_token', access_token])
    return access_token

def connect_inbox(users): 
    user = users[0]
    logger('connecting to imap, refreshing access token')
    user_email = user['email']
    latest_access_token = refresh_token(user['tokens']) # update access token
    M = imaplib.IMAP4_SSL('imap.gmail.com')
    logger(['logging', user_email, latest_access_token])
    M.authenticate(*xoauth_authenticate(user_email, latest_access_token))
    logger('authenticated')
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
    match_grp = re.search('[\\+\\-]', dateStr)
    suffix = ''
    if match_grp is not None:
        suffix = match_grp.group(0)
    return dateStr.split(' ' + suffix)[0]

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
    org_subj = original['Subject']
    try:
        subj = decode_header(original['Subject'])[0][0]
        win_subj = subj.decode('utf-8')
        fin_subj = win_subj.encode("ascii", "ignore")
        logger(['subject', org_subj, subj, fin_subj])
    except:
        fin_subj = org_subj
    parsed_mail_from = parse_mail_from(original['From'])
    parsed_mail_to = parse_mail_from(original['To'])
    parsed_mail = {
        "from": parsed_mail_from,
        "sub": fin_subj,
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
user_list = get_user_list()
while 1:
    mailConn = connect_inbox(user_list)
    try:
        mailIds = extract_mail_ids(mailConn)
        # logger(['extracted mail ids', mailIds[-50:]])
        mail_ids_to_fetch = mailIds[-5] # recent mail ids in the start of list
        fetched_mails = fetch_mail_for_id(mailConn, str(mailIds[-20]) +':'+str(mailIds[-1]))
        parsed_mail_list = parse_mail_list(fetched_mails)
        db_entry(parsed_mail_list)
        sleep(15*60)
        logger(['parsed mail list', len(parsed_mail_list)])
    except KeyboardInterrupt:
        close_server()
        break
# fetch_mail_for_id(mailIds[0])

