'use strict';

define(['plugins/router'], function (router) {
  console.log('Loading Shell...');

  return {
    router: router,

    activate: function () {
      router.map([
        {route: '', moduleId: 'viewmodels/home', title: 'Home', nav: true}
        /*{durandal:routes}*/
      ]).buildNavigationModel();

      return router.activate();
    }
  };
});
