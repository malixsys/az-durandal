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
