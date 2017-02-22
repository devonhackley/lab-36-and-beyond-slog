'use strict';

require('angular').module('blog')
.component('login', {
  template: require('./login.html'),
  bindings: {
    user: '<',
    handleSubmit: '<',
  },
});
