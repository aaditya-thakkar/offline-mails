import imaplib
from time import sleep

M = imaplib.IMAP4_SSL('imap.gmail.com')
M.login('abhijitdev9@gmail.com', 'xxxxxxxxxx')
# typ, data = M.search(None, 'ALL')
while 1:
  try:
    x = M.select()
    _, data = M.search(None, 'ALL')
    # for num in data[0].split():
    #     typ, data = M.fetch(num, '(RFC822)')
    #     print 'Message %s\n%s\n' % (num, data[0][1])
    sleep(1)
    print len(data[0])
    print '===>>', x
  except KeyboardInterrupt:
    M.close()
    M.logout()
    break