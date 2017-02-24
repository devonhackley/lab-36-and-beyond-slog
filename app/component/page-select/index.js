'use strict';

require('angular').module('blog')
.component('pageSelect', {
  template: require('./page-select.html'),
  bindings: {
    pages: '<',
    showAll: '<',
    selected: '<',
    handleSelect: '<',
  },
});
