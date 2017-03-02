'use strict';

require('angular').module('blog')
.filter('navFilter', function(){
  return function(pages) {
    return pages.filter(page => {
      page.showInNav;
    });
  };
});
