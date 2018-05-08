var request = require('request');
var fs = require('fs');
var path = require('path')

var loginInfo = require(path.resolve(__dirname, 'config/login.json'));
var config = require('./conf');
var iotApi = require('./api');

let iotUrl = 'https://' + config.host + ':' + config.port;

// 保存令牌
let saveAccessToken = (body) => {
  loginInfo = {
    accessToken: body.accessToken,
    refreshToken: body.refreshToken,
    tokenType: body.tokenType,
    expiresIn: parseInt(body.expiresIn) * 1000 + Date.now()
  };
  fs.writeFile(path.resolve(__dirname, 'config/login.json'), JSON.stringify(loginInfo), 'utf8', (err) => {
    if (err) throw err;
    console.log('The LoginInfo file has been saved!');
  });
}

// 刷新令牌
let refreshAccessToken = () => {
  return new Promise((resolve, reject) => {
    var options = {
      url: iotUrl + iotApi.refreshToken.url,
      method: iotApi.refreshToken.method,
      cert: config.cert,
      key: config.key,
      strictSSL: false,
      json: true,
      body: {
        appId: config.appId,
        secret: config.secret,
        refreshToken: loginInfo.refreshToken
      }
    };
    request(options, (error, res, body) => {
      if (!error && res.statusCode === 200) {
        console.log('refreshAccessToken:' + JSON.stringify(body));
        saveAccessToken(body);
        resolve({
          loginInfo
        });
      } else {
        // 如果刷新令牌失败，需重新获取令牌
        return fetchAccessToken();
      }
    });
  });
};

// 获取令牌
let fetchAccessToken = () => {
  return new Promise((resolve, reject) => {
    var options = {
      url: iotUrl + iotApi.fetchToken.url,
      method: iotApi.fetchToken.method,
      cert: config.cert,
      key: config.key,
      form: {
        'appId': config.appId,
        'secret': config.secret
      },
      strictSSL: false,
      json: true
    };
    request(options, (error, res, body) => {
      if (!error && res.statusCode === 200) {
        console.log('fetchAccessToken:' + JSON.stringify(body));
        saveAccessToken(body);
        resolve({
          loginInfo
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

// 加载时，首次获取令牌
(function loadAccessToken() {
  if (loginInfo.expiresIn < Date.now()) {
    fetchAccessToken();
  } else {
    console.log('loadAccessToken:' + JSON.stringify(loginInfo));;
  }
})();

// 执行任何API前，都需要检查登录
exports.checkLogin = () => {
  return new Promise((resolve, reject) => {
    // 如果access_token有效，且未过期，直接返回成功
    // 否则，需要执行刷新token命令，重新获取access_token
    if (loginInfo.expiresIn > Date.now()) {
      resolve(loginInfo);
    } else {
      return refreshAccessToken();
    }
  });
};
