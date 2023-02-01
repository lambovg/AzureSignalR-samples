var https = require('https');

var etag = '';

module.exports = function (context) {
    var req = https.request("https://datalogstrigger.azurewebsites.net/api/datalogs/1003/65", {
        method: 'GET',
        headers: {'User-Agent': 'serverless', 'If-None-Match': etag}
    }, res => {
        if (res.headers['etag']) {
            etag = res.headers['etag']
        }

        var body = "";

        res.on('data', data => {
            body += data;
        });

        res.on("end", () => {
            var jbody = {}
            if (res.statusCode === 200) {
                jbody = JSON.parse(body);
            }

            context.bindings.signalRMessages = [{
                // "groupName": "myGroup",
                "target": "1003-65-datalogs",
                "arguments": [jbody]
            }, {
                "target": "1003-66-datalogs",
                "arguments": ['Hello, SignalR!']
            }]
            context.done();
        });
    }).on("error", (error) => {
        context.log(error);
        context.res = {
          status: 500,
          body: error
        };
        context.done();
    });
    req.end();
}