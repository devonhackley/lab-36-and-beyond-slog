'use strict';

require('angular').module('blog')
.component('dashboard', {
  template: require('./dashboard.html'),
  controller: ['$log', 'pageService', function($log,pageService){
    this.$onInit = () => {

      this.pageSelectPages = [];
      this.pageSelectShowAll= false;
      this.pageSelectSelected = null;
      this.pageSelectHandleSelect = (page) => {
        this.pageSelectShowAll = !this.pageSelectShowAll;
        this.pageSelectSelected = page;
        this.pageEditorPage = page;
      };

      this.pageEditorPage = {title: '', content:'', showInNav:false};
      this.pageEditorHandleSubmit = (page) => {
        pageService.create(page)
        .then(page => {
          // this.pageSelectPages.push(page);
          let found = false;
          this.pageSelectPages.map(item => {
            if(page.id == item.id) {
              found = true;
              return page;
            }
            return item;
          });
          if(!found){
            this.pageSelectPages.push(page);
          };
          this.pageEditorPage = {title: '', content:'', showInNav:false};
        })
        .catch($log.error);
      };

      this.handlePageNew = () => {
        this.pageEditorPage = {title:'', content:'', showInNav:false}
      };

      this.handlePageDelete = (page) => {
        pageService.delete(page)
        .then(() => {
          this.pageSelectPages = this.pageSelectPages.filter(item => {
            return item.id != page.id;
          });
          this.pageSelectSelected = this.pageSelectPages[0];
        });
      };

      pageService.fetchAll()
      .then(pages => {
        this.pageSelectPages = pages;
        this.pageSelectSelected = pages[0];
      });
    };
  }],
});



// 'use strict'
//
// require('angular').module('blog')
// .component('dashboard', {
//   template: require('./dashboard.html'),
//   controller: ['$log','pageService', function($log, pageService){
//     this.$onInit = () => {
//
//       this.pageSelectPages = [];
//       this.pageSelectShowAll = false;
//       this.pageSelectSelected = null;
//       this.pageSelectHandleSelect = (page) => {
//         this.pageSelectShowAll = !this.pageSelectShowAll;
//         this.pageSelectSelected = page;
//         this.pageEditorPage = page;
//       };
//
//       this.pageEditorPage = {title: '', content: '', showInNav: false}
//       this.pageEditorHandleSubmit = (page) => {
//         pageService.create(page)
//         .then(page => {
//           $log.log('success', page)
//           this.pageSelectPages.push(page);
//           this.pageEditorPage = {title: '', content: '', showInNav: false}
//         })
//         .catch($log.error)
//       }
//
//       this.handlePageNew = () => {
//         this.pageEditorPage = {title: '', content: '', showInNav: false}
//       }
//
//       this.handlePageDelete = (page) => {
//         pageService.delete(page)
//         .then(() => {
//           this.pageSelectPages = this.pageSelectPages.filter(item => {
//             return item.id != page.id;
//           });
//
//           this.pageSelectSelected = this.pageSelectPages[0];
//         })
//       }
//
//       pageService.fetchAll()
//       .then(pages => {
//         console.log('pages', pages)
//         this.pageSelectPages = pages
//         this.pageSelectSelected = pages[0]
//       })
//     }
//   }],
// });
