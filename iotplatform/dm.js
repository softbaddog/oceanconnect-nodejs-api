var request = require('request');

var config = require('./conf');
var iotApi = require('./api');

let iotUrl = 'https://' + config.host + ':' + config.port;

let deviceInfo = {
  manufacturerId: 'Huawei',
  manufacturerName: 'Huawei',
  deviceType: 'OneButton',
  model: 'IOTBTN-001',
  protocolType: 'CoAP'
};

// 注册一个新设备
exports.registerDevice = (loginInfo, nodeId) => {
  return new Promise((resolve, reject) => {
    var options = {
      method: iotApi.createDevice.method,
      url: iotUrl + iotApi.createDevice.url,
      cert: config.cert,
      key: config.key,
      headers: {
        'app_key': config.appId,
        'Authorization': loginInfo.tokenType + ' ' + loginInfo.accessToken
      },
      qs: {
        'appId': config.appId
      },
      body: {
        'verifyCode': nodeId,
        'nodeId': nodeId,
        'timeout': 300
      },
      strictSSL: false,
      json: true
    };
    request(options, (error, res, body) => {
      if (!error && res.statusCode === 200) {
        resolve(body.deviceId);
      } else {
        console.log(body);
        reject({
          statusCode: res.statusCode,
          statusText: res.statusText
        });
      }
    });
  });
};

// 删除一个设备
exports.deleteDevice = (loginInfo, deviceId) => {
  return new Promise((resolve, reject) => {
    var options = {
      method: iotApi.deleteDevice.method,
      url: iotUrl + iotApi.deleteDevice.url + '/' + deviceId,
      cert: config.cert,
      key: config.key,
      headers: {
        'app_key': config.appId,
        'Authorization': loginInfo.tokenType + ' ' + loginInfo.accessToken
      },
      qs: {
        'appId': config.appId
      },
      strictSSL: false,
      json: true
    };
    request(options, (error, res, body) => {
      if (!error && res.statusCode === 204) {
        resolve({
          result: true
        });
      } else {
        console.log(body);
        reject({
          statusCode: res.statusCode,
          statusText: res.statusText
        });
      }
    });
  });
};

// 更新一个设备
exports.updateDevice = (loginInfo, deviceId, deviceName) => {
  return new Promise((resolve, reject) => {
    var options = {
      method: iotApi.updateDevice.method,
      url: iotUrl + iotApi.updateDevice.url + '/' + deviceId,
      cert: config.cert,
      key: config.key,
      headers: {
        'app_key': config.appId,
        'Authorization': loginInfo.tokenType + ' ' + loginInfo.accessToken
      },
      qs: {
        'appId': config.appId
      },
      body: {
        name: deviceName,
        manufacturerId: deviceInfo.manufacturerId,
        manufacturerName: deviceInfo.manufacturerName,
        deviceType: deviceInfo.deviceType,
        model: deviceInfo.model,
        protocolType: deviceInfo.protocolType
      },
      strictSSL: false,
      json: true
    };
    request(options, (error, res, body) => {
      if (!error && res.statusCode === 204) {
        resolve({
          deviceInfo: {
            deviceId: deviceId,
            deviceName: deviceName
          }
        });
      } else {
        reject({
          statusCode: res.statusCode,
          statusText: res.statusText
        });
      }
    });
  });
};

// 获取设备历史记录
exports.getDataHistorty = (loginInfo, deviceId, pageNo, pageSize) => {
  return new Promise((resovle, reject) => {
    var options = {
      method: iotApi.queryHistoryData.method,
      url: iotUrl + iotApi.queryHistoryData.url,
      cert: config.cert,
      key: config.key,
      headers: {
        'app_key': config.appId,
        'Authorization': loginInfo.tokenType + ' ' + loginInfo.accessToken
      },
      qs: {
        'deviceId': deviceId,
        'gatewayId': deviceId,
        'pageNo': pageNo,
        'pageSize': pageSize
      },
      strictSSL: false,
      json: true
    };
    request(options, (error, res, body) => {
      if (!error && res.statusCode === 200) {
        resolve({
          result: true,
          totalCount: body.totalCount,
          dataHistorty: body.deviceDataHistoryDTOs
        });
      } else {
        reject(res.statusCode, res.statusText);
      }
    });
  });
};

// 获取多个设备数据
exports.getDevicesInfo = (loginInfo, pageNo, pageSize) => {
  return new Promise((resolve, reject) => {
    var options = {
      url: iotUrl + iotApi.retrieveDevice.url,
      method: iotApi.retrieveDevice.method,
      cert: config.cert,
      key: config.key,
      headers: {
        'app_key': config.appId,
        'Authorization': loginInfo.tokenType + ' ' + loginInfo.accessToken
      },
      qs: {
        'pageNo': pageNo,
        'pageSize': pageSize
      },
      strictSSL: false,
      json: true
    };
    request(options, (error, res, body) => {
      if (!error && res.statusCode === 200) {
        resolve({
          totalCount: body.totalCount,
          devicesInfo: body.devices
        });
      } else {
        console.log(body);
        reject({
          statusCode: res.statusCode,
          statusText: res.statusText
        });
      }
    });
  });
};