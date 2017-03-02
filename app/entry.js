'use strict';
require('./scss/main.scss');
const angular = require('angular');

const uiRouter = require('angular-ui-router');
const ngMarked = require('angular-marked');
const ngAnimate = require('angular-animate');
const ngClipboard = require('angular-clipboard');
angular.module('blog', [uiRouter, ngMarked,ngClipboard.name,ngAnimate])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.when('', '/home');

  let routes = [
    {
      name:'home',
      url:'/home',
      template: '<home></home>'
    },
    {
      name:'homepage',
      url:'/home/:id',
      template: '<home></home>'
    },
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
require('./filter/nav-filter');
require('./filter/page-search-filter');
require('./container/home');
require('./container/admin');
require('./container/dashboard');
require('./component/login');
require('./component/page-editor');
require('./component/page-select');
require('./component/page-search');
require('./component/navbar');
