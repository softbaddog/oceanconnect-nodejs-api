var express = require("express");
var router = express.Router();

var Devices = require("../models/devices");

var auth = require("./../iotplatform/auth");
var dm = require("./../iotplatform/dm");

// Bind a new device and update device name
router.post("/bind", (req, res, next) => {
  let nodeId = req.query.nodeId;
  let nodeName = req.query.nodeName;

  // You should check login first, and register a new device
  auth
    .checkLogin()
    .then(loginInfo => {
      return dm.registerDevice(loginInfo, nodeId)
        .then(deviceId => {
          console.log(deviceId);
          return dm.updateDevice(loginInfo, deviceId, nodeName);
        });
    })
    .then(data => {
      res.json({
        status: "0",
        msg: "",
        result: data.deviceInfo
      });
    })
    .catch(error => {
      res.json({
        status: error.statusCode,
        msg: error.statusText
      });
    });
});

// Unbind a device
router.delete("/unbind", (req, res, next) => {
  let deviceId = req.query.deviceId;
  console.log(deviceId);
  auth
    .checkLogin()
    .then(loginInfo => {
      return dm.deleteDevice(loginInfo, deviceId);
    })
    .then(data => {
      res.json({
        status: "0",
        msg: "delete a device ok",
      });
    })
    .catch(error => {
      res.json({
        status: error.statusCode,
        msg: error.statusText
      });
    });
});

// get devices list
router.get("/", (req, res, next) => {
  let pageNo = parseInt(req.query.pageNo) || 0;
  let pageSize = parseInt(req.query.pageSize) || 10;

  // You should check login first, and get devices info
  auth
    .checkLogin()
    .then(loginInfo => {
      return dm.getDevicesInfo(loginInfo, pageNo, pageSize);
    })
    .then(data => {
      console.log(data);
      let deviceList = [];
      data.devicesInfo.forEach((doc, index) => {
        let services = {};
        for (let service in doc.services) {
          switch (service.serviceId) {
            case "Button":
              services.button = service.data;
              break;
            case "Temperature":
              services.temperature = service.data;
              break;
            default:
              break;
          }
        }

        deviceList.push({
          deviceId: doc.deviceId,
          createTime: doc.createTime,
          lastModifiedTime: doc.lastModifiedTime,
          deviceInfo: {
            nodeId: doc.deviceInfo.nodeId,
            name: doc.deviceInfo.name,
            status: doc.deviceInfo.status
          },
          services: services
        });
      });
      res.json({
        status: "0",
        msg: "",
        result: {
          count: deviceList.length,
          list: deviceList
        }
      });
    })
    .catch(error => {
      res.json({
        status: error.statusCode,
        msg: error.statusText
      });
    });
});

module.exports = router;