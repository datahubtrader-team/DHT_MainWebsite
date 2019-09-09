module.exports.sendCommunication = function(RecipientEmail, name) {

    var request = require("request");

    var options = {
        method: 'POST',
        url: 'http://localhost:5000/outboundcommunications',
        headers: {
            'Postman-Token': '48a3c9e0-090f-40e5-a85b-6987348a489f',
            'cache-control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body: {
            firstName: name,
            lastName: 'Hamm',
            message: 'This is a test',
            email: RecipientEmail,
            number: ''
        },
        json: true
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

}