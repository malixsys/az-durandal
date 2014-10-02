'use strict';

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

