/* eslint-disable no-underscore-dangle */

const moment = require('moment');

const _ids = [];
const messages = [];

const FetchMessage = data => {
  data.forEach((item,index) => {
    let construct = '';
    construct += `\nPress ${index} for\n`;
    construct += `From: ${item.from}\n`;
    construct += `Subject: ${item.sub}\n`;
    construct += `Time: ${moment(item.time).format('dddd, MMMM Do, YYYY h:mm:ss A')} \n \n \n`
    _ids.push(item._id);
    messages.push(construct);
  });

  return {
    messages,
    mailIds: _ids,
  };
};

const ParseMessage = (data,index) => {
  let message = '';
  data.slice(index, index+10).forEach((item,i) => {
    //console.log(item);
    //console.log(i);
    message+= item;
  });

  return message;
};

module.exports = { FetchMessage, ParseMessage};
