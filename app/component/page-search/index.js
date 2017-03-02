'use strict';

require('angular').module('blog')
.component('pageSearch', {
  template: require('./page-search.html'),
  bindings: {
    pages: '<',
    handleSelect: '<',
    searchTerm: '=',
  }
});
