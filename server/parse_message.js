
var tuple = {};
var var userId_mails_map = {};
var message = "";
var _ids = [];
function parseMessage(req, res) {
  axios.get('http://localhost:8082/mail?phoneNumber='+request.body.From)
    .then(function(response){
    console.log(response.data);
    for(var item=0;item<response.length;item++){
        message += "From: "+ response.data[item]["from"]+ "\n";
        message += "Subject: "+ response.data[item]["sub"] + "\n \n \n"
        _ids.push(response.data[item]["_id"]);
    }
    tuple.message = message;
    tuple.mails = _ids;
    return tuple;
  }); 
}

module.exports = parseMessage;