module.exports = {
  // token fetch and refresh
  fetchToken: {
    method: 'POST',
    url: '/iocm/app/sec/v1.1.0/login'
  },
  refreshToken: {
    method: 'POST',
    url: '/iocm/app/sec/v1.1.0/refreshToken'
  },
  // devices management
  createDevice: {
    method: 'POST',
    url: '/iocm/app/reg/v1.2.0/devices'
  },
  retrieveDevice: {
    method: 'GET',
    url: '/iocm/app/dm/v1.3.0/devices'
  },
  updateDevice: {
    method: 'PUT',
    url: '/iocm/app/dm/v1.2.0/devices'
  },
  deleteDevice: {
    method: 'DELETE',
    url: '/iocm/app/dm/v1.1.0/devices'
  },
  // history data
  queryHistoryData: {
    method: 'GET',
    url: '/iocm/app/data/v1.1.0/deviceDataHistory'
  },
  // subscribe
  subscribeEvent: {
    method: 'POST',
    url: '/iocm/app/sub/v1.2.0/subscribe'
  }
};
