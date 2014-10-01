'use strict';

define(['knockout', 'durandal/app', 'durandal/system', 'jquery', 'locale', 'translate'], function (ko, app, system, $, locale, _) {
  var todos = [],
    isLoading = false,

  // Lifecycle Methods
    activate = function activate() {
      isLoading = true;

      return loadTodos().then(function (loadedTodos) {
        todos = loadedTodos;
        isLoading = false;
      });
    },

    deactivate = function deactivate() {
    },

  // Private Methods
    loadTodos = function () {
      return system.defer(function (dfd) {
        setTimeout(function () {
          dfd.resolve([
            {
              title: 'Create your first ViewModel',
              content: 'To create a ViewModel using yeoman you could call <strong>$ yo durandal:viewmodel.</strong>'
            },
            {
              title: 'Test your first ViewModel',
              content: 'To create Spec for your ViewModel using yeoman you could call <strong>$ yo durandal:viewmodeltest.</strong>'
            },
            {
              title: 'Create View for your ViewModel',
              content: 'To create a View using yeoman you could call <strong>$ yo durandal:view.</strong>'
            }
          ]);
        }, 250);
      });
    };

  var vm = {
    tag: _('home.tag', {escapeInterpolation: false}),
    todos: todos,
    isLoading: isLoading,
    locale: locale,
    activate: activate,
    deactivate: deactivate
  };

  return vm;
});
