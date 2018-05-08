var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
  "deviceId": String,
  "gatewayId": String,
  "nodeType": String,
  "createTime": String,
  "lastModifiedTime": String,
  "deviceInfo": {
    "nodeId": String,
    "name": String,
    "description": String,
    "manufactureId": String,
    "manufacturerName": String,
    "mac": String,
    "location": String,
    "deviceType": String,
    "model": String,
    "swVersion": String,
    "fwVersion": String,
    "hwVersion": String,
    "protocolType": String,
    "signalStrength": String,
    "bridgeId": String,
    "supportedSecurity": String,
    "isSecurity": String,
    "sigVersion": String,
    "runningStatus": String,
    "status": String,
    "statusDetail": String,
    "mute": String
  },
  "services": [
    {
      "serviceType": String,
      "serviceId": String,
      "data" : String,
      "eventTime": String,
      "serviceInfo": Object
    }
  ],
  "connectionInfo": {
    "protocolType": String
  },
  "location": Object,
  "devGroupIds": [
    String
  ]
});

module.exports = mongoose.model('Device', deviceSchema);
