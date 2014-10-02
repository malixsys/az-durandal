'use strict';

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
