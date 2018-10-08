def my_concat(args):
    finalStr = ''
    for x in args:
        finalStr += str(x)
    return finalStr

def logger(msgs):
    if isinstance(msgs, str):
        msgs = [msgs]
    print '=====>>', my_concat(msgs)