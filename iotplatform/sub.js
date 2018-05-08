var request = require('request');
var config = require('config');
var iotApi = require('api');

let iotUrl = 'https://' + config.host + ':' + config.port;
let callbackurl = 'http://softbaddog.free.ngrok.cc/deviceDataChanged';

let subscribe = () => {
  return new Promise((resolve, reject) => {
      var options = {
        method: iotApi.subscribe.method,
        url: iotUrl + iotApi.subscribe.url,
        cert: config.cert,
        key: config.key,
        strictSSL: false,
        json: true,
        headers: {
          'app_key': config.appId,
          'Authorization': loginInfo.tokenType + ' ' + loginInfo.accessToken
        },
        body: {
          notifyType: 'deviceDataChanged',
          callbackurl: callbackurl
        }
      };
      request(options, (error, response, body) => {
        if (!error && response.statusCode === 201) {
          resolve({
            result: true
          })
        } else {
          reject(response.statusCode, response.statusText);
        }
      });
  })
}