'use strict';

require('angular').module('blog')
.component('admin', {
  template: require('./admin.html'),
  controller: ['$log', 'authService', '$location', AdminController ],
});

function AdminController($log, authService, $location) {
  this.$onInit = () => {

    authService.tokenFetch()
    .then(() => $location.path('/dashboard'))

    this.loginUser = {email: '', password: ''};
    this.loginHandleSubmit = (user) => {
      authService.login(user)
      .then(token => {
        $log.log('success', token);
        this.loginUser = {email: '', password: ''};
         $location.path('/dashboard');
      })
      .catch($log.error);
    }

  };
}
