'use strict';

define(['plugins/router', 'jquery', 'translate', 'locale' ], function (router, $, _, locale) {
  console.log('Loading Shell...');
  function onStartButtonClicked() {
    $('#main_wrapper').toggleClass('toggled');
  }


  var observable = require('plugins/observable');

  var viewModel = {
    router: router,

    activate: function () {
      router.map([
        {route: '', moduleId: 'viewmodels/home', title: 'Home', nav: true}
        /*{durandal:routes}*/
      ]).buildNavigationModel();

      return router.activate();
    },

    onStartButtonClicked: onStartButtonClicked,

    language_switch_label: _('shell.language_switch_label'),

    switchLanguage: function () {
      var current = locale();
      var next = 'en' === current ? 'fr-CA' : 'en';
      locale(next);
    }
  };




  return viewModel;
});
