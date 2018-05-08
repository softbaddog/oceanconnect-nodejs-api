var fs = require('fs');
var path = require('path');

module.exports = {
	host: '117.78.47.187',
	port: '8743',
  server: 'https://117.78.47.187:8743',
	appId: 'PcH6DS2vvO4_0ywnlaCF4Hfb01oa',
	secret: 'PB4lrxotkNR5F0NUdpEfsfcAnDsa',
	cert: fs.readFileSync(path.resolve(__dirname, 'ssl/client.crt')),
	key: fs.readFileSync(path.resolve(__dirname, 'ssl/client.key')),
};
