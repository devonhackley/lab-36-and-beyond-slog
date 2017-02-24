'use strict';

require('angular').module('blog')
.component('pageEditor', {
  template: require('./page-editor.html'),
  bindings: {
    page: '<',
    handleSubmit: '<',
  },
});
