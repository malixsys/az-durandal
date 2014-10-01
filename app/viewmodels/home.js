'use strict';

define(['knockout', 'durandal/app', 'durandal/system', 'i18next'], function (ko, app, system, i18n) {
  var todos = [],
    isLoading = false,

    onButtonClick = function onButtonClick() {
    },

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

  return {
    tag: i18n.t('home.tag', {escapeInterpolation: false}),
    todos: todos,
    isLoading: isLoading,

    onButtonClick: onButtonClick,

    activate: activate,
    deactivate: deactivate
  };
});
