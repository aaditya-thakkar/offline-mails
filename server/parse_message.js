/* eslint-disable no-underscore-dangle */
let message = '';
const _ids = [];
const parseMessage = data => {
  data.forEach((item, index) => {
    message += `\nPress ${index} for\n`;
    message += `From: ${item.from}\n`;
    message += `Subject: ${item.sub}\n \n \n`;
    _ids.push(item._id);
  });

  return {
    message,
    mailIds: _ids,
  };
};

module.exports = parseMessage;
