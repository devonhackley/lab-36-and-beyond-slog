'use strict';

require('angular').module('blog')
.filter('pageSearchFilter', function(){
  return function(pages, searchTerm) {
    let fRegex = generateFuzzyRegex(searchTerm);
    console.log('pages', pages);
    return pages.filter(page => {
      return fRegex.test(page.title.toLowerCase())
    });
  };
});

function generateFuzzyRegex(term){
  if(!term) return /.*/;
  let fuzzy = term.toLowerCase().split('').join('.*');
  return new RegExp(`.*${fuzzy}.*`);
}
