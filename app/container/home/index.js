'use strict';

require('angular').module('blog')
.component('home', {
  template: require('./home.html'),
  controller: ['$log', '$stateParams', '$location', 'pageService', HomeController],
});

function HomeController($log, $stateParams, $location, pageService){
  this.$onInit = () => {
    this.pages = [];
    this.selected = null;
    this.searchTerm = '';

    this.navbarHandleSelect = (page) => {
      $location.path(`/home/${page.id}`);
      this.searchTerm ='';
      $log.log('item in nav selected');
    };

    pageService.fetchAll()
    .then(pages => {
      this.pages = pages;

      let pageID = $stateParams.id;
      if(!pageID)
        return this.selected = this.pages[0];
      this.selected = pages.reduce((selected,current) => {
        if(current.id === pageID)
          return current;
        return selected;
      },this.selected);
    })
    .catch($log.error);
  }
}
