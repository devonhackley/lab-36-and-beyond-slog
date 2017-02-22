'use strict';

require('angular').module('blog')
.service('authService', ['$log', '$q', '$window', '$http', authService])

function authService($log, $q, $window, $http){
  let authToken;

  let tokenSave= (token) => {
    if(!token)
      return $q.reject(new Error('No token given'));
    try {
      $window.localStorage.token = JSON.stringify(token);
      authToken = token;
      return $q.resolve(token);
    } catch (err) {
      return $q.reject(err);
    }
  };

  let authService = {};

  authService.tokenFetch = () => {
    if(authToken)
      return $q.resolve(authToken);

    try {
      authToken = JSON.parse($window.localStorage.token);
      return $q.resolve(authToken);
    } catch(err) {
      return $q.reject(err);
    };
  };

  authService.login = (user) => {
    let url = `${__API_URL__}/api/login`;
    let encoded = $window.btoa(`${user.email}:${user.password}`);
    let config = {
      headers:{
        Accept: 'application/json',
        Authorization: `Basic ${encoded}`,
      },
    };
    return $http.get(url, config)
    .then(res => {
      return tokenSave(res.data);
    })
    .catch(err => $log.log(err));
  };
  return authService;

};
