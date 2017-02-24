'use strict';
require('./scss/main.scss');
const angular = require('angular');

const uiRouter = require('angular-ui-router');
const ngMarked = require('angular-marked');
angular.module('blog', [uiRouter, ngMarked])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.when('', '/admin');

  let routes = [
    {
      name: 'layout',
      url: '/layout',
      template: '<layout></layout>',
    },
    {
      name: 'admin',
      url: '/admin',
      template: '<admin></admin>',
    },
    {
      name: 'dashboard',
      url: '/dashboard',
      template:'<dashboard></dashboard>',
    }
  ];

  routes.forEach(route => $stateProvider.state(route));
}]);

require('./service/admin-service.js');
require('./service/page-service.js');
require('./container/admin');
require('./container/dashboard');
require('./component/login');
require('./component/page-editor');
require('./component/page-select');
