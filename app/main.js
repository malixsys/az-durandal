'use strict';

requirejs.config({
  paths: {
    'text': '../bower_components/requirejs-text/text',
    'durandal': '../bower_components/durandal/js',
    'plugins': '../bower_components/durandal/js/plugins',
    'transitions': '../bower_components/durandal/js/transitions',
    'knockout': '../bower_components/knockout.js/knockout.debug',
    'jquery': '../bower_components/jquery/jquery',
    'i18next': '../bower_components/i18next/i18next.amd.withJQuery',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
    'modernizr': '../bower_components/modernizr/modernizr',
    'ripples': '../bower_components/bootstrap-material-design/scripts/ripples',
    'material': '../bower_components/bootstrap-material-design/scripts/material'
  },
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    modernizr: {
      exports: 'Modernizr'
    }
  }
});

define('locale', ['knockout', 'i18next'], function (knockout, i18n) {
  var startLang = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.userLanguage || window.navigator.language || 'fr-CA';
  var current = knockout.observable(startLang);
  var vm = knockout.computed({
    read: function () {
      return current();
    },
    write: function (value) {
      i18n.setLng(value, function(){
        current(value);
        console.log('LOCALE is now ', value);
      });
    }
  });

  return vm.extend({notify: 'always'});
});

define('translate', ['knockout', 'i18next', 'locale'], function (ko, i18next, locale) {
  return function (key, opts) {
    var vm = {
      read: function () {
        var lng = locale();
        var ret = i18next.t(key, opts);
        console.log('TRANS', key, lng, ret);
        return ret;
      },
      owner: locale()
    };
    return ko.computed(vm).extend({notify: 'always'});
  };
});


define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'durandal/binder', 'i18next', 'jquery', 'locale', 'bootstrap'],
  function (system, app, viewLocator, binder, i18n, $, locale) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.configurePlugins({
      router: true,
      dialog: true,
      widget: true,
      observable: true
    });

    var i18NOptions = {
      debug: true,
      detectFromHeaders: false,
      detectLngFromLocalStorage: true,
      fallbackLang: window.navigator.languages || ['fr-CA'],
      lng: locale(),
      ns: 'app',
      resGetPath: 'locales/__lng__/localization.json',
      useCookie: false
    };


    app.start().then(function () {
      // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
      // Look for partial views in a 'views' folder in the root.
      viewLocator.useConvention();

      i18n.init(i18NOptions, function () {
        //Call localization on view before binding...
        binder.binding = function (obj, view) {
          $(view).i18n();
        };

        app.title = i18n.t('title');

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell');
      });
    });
  });
