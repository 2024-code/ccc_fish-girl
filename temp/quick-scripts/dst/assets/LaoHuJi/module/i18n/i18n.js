
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/i18n/i18n.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '93789C/shtIL6entYsZPjee', 'i18n');
// LaoHuJi/module/i18n/i18n.js

"use strict";

var Polyglot = require('polyglot');

var lang = cc.sys.localStorage.getItem('language');

if (!lang) {
  switch (cc.sys.language) {
    case 'zh':
    default:
      lang = 'zh';
      break;

    case 'my':
      lang = 'my';
      break;

    case 'en':
      lang = 'en';
      break;

    case 'es':
      lang = 'es';
      break;

    case 'fr':
      lang = 'fr';
      break;

    case 'th':
      lang = 'th';
      break;

    case 'vn':
      lang = 'vn';
      break;

    case 'kp':
      lang = 'kp';
      break;

    case 'id':
      lang = 'id';
      break;

    case 'in':
      lang = 'in';
      break;
  }
}

var data = require(lang); // update this to set your default displaying language in editor
// let polyglot = null;


var polyglot = new Polyglot({
  phrases: data,
  allowMissing: true
});
module.exports = {
  /**
   * This method allow you to switch language during runtime, language argument should be the same as your data file name
   * such as when language is 'zh', it will load your 'zh.js' data source.
   * @method init
   * @param language - the language specific data file name, such as 'zh' to load 'zh.js'
   */
  init: function init(language) {
    lang = language;
    data = require(lang);
    polyglot.replace(data);
  },

  /**
   * this method takes a text key as input, and return the localized string
   * Please read https://github.com/airbnb/polyglot.js for details
   * @method t
   * @return {String} localized string
   * @example
   *
   * var myText = i18n.t('MY_TEXT_KEY');
   *
   * // if your data source is defined as
   * // {"hello_name": "Hello, %{name}"}
   * // you can use the following to interpolate the text
   * var greetingText = i18n.t('hello_name', {name: 'nantas'}); // Hello, nantas
   */
  t: function t(key, opt) {
    return polyglot.t(key, opt);
  }
};

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxpMThuXFxpMThuLmpzIl0sIm5hbWVzIjpbIlBvbHlnbG90IiwicmVxdWlyZSIsImxhbmciLCJjYyIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsYW5ndWFnZSIsImRhdGEiLCJwb2x5Z2xvdCIsInBocmFzZXMiLCJhbGxvd01pc3NpbmciLCJtb2R1bGUiLCJleHBvcnRzIiwiaW5pdCIsInJlcGxhY2UiLCJ0Iiwia2V5Iiwib3B0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBeEI7O0FBQ0EsSUFBSUMsSUFBSSxHQUFHQyxFQUFFLENBQUNDLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsQ0FBWDs7QUFDQSxJQUFHLENBQUNKLElBQUosRUFDQTtBQUNJLFVBQU9DLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPRyxRQUFkO0FBQ0EsU0FBSyxJQUFMO0FBQ0g7QUFDR0wsTUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFDQSxTQUFLLElBQUw7QUFDQUEsTUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFDQSxTQUFLLElBQUw7QUFDQUEsTUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFDSCxTQUFLLElBQUw7QUFDR0EsTUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFDSCxTQUFLLElBQUw7QUFDR0EsTUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFDSCxTQUFLLElBQUw7QUFDR0EsTUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFDSCxTQUFLLElBQUw7QUFDR0EsTUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFDSCxTQUFLLElBQUw7QUFDR0EsTUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFDSCxTQUFLLElBQUw7QUFDR0EsTUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFDSCxTQUFLLElBQUw7QUFDR0EsTUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTtBQS9CQTtBQWlDSDs7QUFDRCxJQUFJTSxJQUFJLEdBQUdQLE9BQU8sQ0FBQ0MsSUFBRCxDQUFsQixFQUEwQjtBQUMxQjs7O0FBQ0EsSUFBSU8sUUFBUSxHQUFHLElBQUlULFFBQUosQ0FBYTtBQUFDVSxFQUFBQSxPQUFPLEVBQUVGLElBQVY7QUFBZ0JHLEVBQUFBLFlBQVksRUFBRTtBQUE5QixDQUFiLENBQWY7QUFHQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLElBUGEsZ0JBT1BQLFFBUE8sRUFPRztBQUNaTCxJQUFBQSxJQUFJLEdBQUdLLFFBQVA7QUFDQUMsSUFBQUEsSUFBSSxHQUFHUCxPQUFPLENBQUNDLElBQUQsQ0FBZDtBQUNBTyxJQUFBQSxRQUFRLENBQUNNLE9BQVQsQ0FBaUJQLElBQWpCO0FBQ0gsR0FYWTs7QUFZYjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lRLEVBQUFBLENBMUJhLGFBMEJWQyxHQTFCVSxFQTBCTEMsR0ExQkssRUEwQkE7QUFDVCxXQUFPVCxRQUFRLENBQUNPLENBQVQsQ0FBV0MsR0FBWCxFQUFnQkMsR0FBaEIsQ0FBUDtBQUNIO0FBNUJZLENBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBQb2x5Z2xvdCA9IHJlcXVpcmUoJ3BvbHlnbG90Jyk7XG5sZXQgbGFuZyA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZ3VhZ2UnKTtcbmlmKCFsYW5nKVxue1xuICAgIHN3aXRjaChjYy5zeXMubGFuZ3VhZ2Upe1xuICAgIGNhc2UgJ3poJzpcblx0ZGVmYXVsdDpcbiAgICBsYW5nID0gJ3poJztcbiAgICBicmVhaztcbiAgICBjYXNlICdteSc6XG4gICAgbGFuZyA9ICdteSc7XG4gICAgYnJlYWs7XG4gICAgY2FzZSAnZW4nOlxuICAgIGxhbmcgPSAnZW4nO1xuICAgIGJyZWFrO1xuXHRjYXNlICdlcyc6XG4gICAgbGFuZyA9ICdlcyc7XG4gICAgYnJlYWs7XG5cdGNhc2UgJ2ZyJzpcbiAgICBsYW5nID0gJ2ZyJztcbiAgICBicmVhaztcblx0Y2FzZSAndGgnOlxuICAgIGxhbmcgPSAndGgnO1xuICAgIGJyZWFrO1xuXHRjYXNlICd2bic6XG4gICAgbGFuZyA9ICd2bic7XG4gICAgYnJlYWs7XG5cdGNhc2UgJ2twJzpcbiAgICBsYW5nID0gJ2twJztcbiAgICBicmVhaztcblx0Y2FzZSAnaWQnOlxuICAgIGxhbmcgPSAnaWQnO1xuICAgIGJyZWFrO1xuXHRjYXNlICdpbic6XG4gICAgbGFuZyA9ICdpbic7XG4gICAgYnJlYWs7XG5cdH1cbn1cbmxldCBkYXRhID0gcmVxdWlyZShsYW5nKTsgLy8gdXBkYXRlIHRoaXMgdG8gc2V0IHlvdXIgZGVmYXVsdCBkaXNwbGF5aW5nIGxhbmd1YWdlIGluIGVkaXRvclxuLy8gbGV0IHBvbHlnbG90ID0gbnVsbDtcbmxldCBwb2x5Z2xvdCA9IG5ldyBQb2x5Z2xvdCh7cGhyYXNlczogZGF0YSwgYWxsb3dNaXNzaW5nOiB0cnVlfSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgYWxsb3cgeW91IHRvIHN3aXRjaCBsYW5ndWFnZSBkdXJpbmcgcnVudGltZSwgbGFuZ3VhZ2UgYXJndW1lbnQgc2hvdWxkIGJlIHRoZSBzYW1lIGFzIHlvdXIgZGF0YSBmaWxlIG5hbWVcbiAgICAgKiBzdWNoIGFzIHdoZW4gbGFuZ3VhZ2UgaXMgJ3poJywgaXQgd2lsbCBsb2FkIHlvdXIgJ3poLmpzJyBkYXRhIHNvdXJjZS5cbiAgICAgKiBAbWV0aG9kIGluaXRcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgLSB0aGUgbGFuZ3VhZ2Ugc3BlY2lmaWMgZGF0YSBmaWxlIG5hbWUsIHN1Y2ggYXMgJ3poJyB0byBsb2FkICd6aC5qcydcbiAgICAgKi9cbiAgICBpbml0IChsYW5ndWFnZSkge1xuICAgICAgICBsYW5nID0gbGFuZ3VhZ2U7XG4gICAgICAgIGRhdGEgPSByZXF1aXJlKGxhbmcpO1xuICAgICAgICBwb2x5Z2xvdC5yZXBsYWNlKGRhdGEpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogdGhpcyBtZXRob2QgdGFrZXMgYSB0ZXh0IGtleSBhcyBpbnB1dCwgYW5kIHJldHVybiB0aGUgbG9jYWxpemVkIHN0cmluZ1xuICAgICAqIFBsZWFzZSByZWFkIGh0dHBzOi8vZ2l0aHViLmNvbS9haXJibmIvcG9seWdsb3QuanMgZm9yIGRldGFpbHNcbiAgICAgKiBAbWV0aG9kIHRcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGxvY2FsaXplZCBzdHJpbmdcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIG15VGV4dCA9IGkxOG4udCgnTVlfVEVYVF9LRVknKTtcbiAgICAgKlxuICAgICAqIC8vIGlmIHlvdXIgZGF0YSBzb3VyY2UgaXMgZGVmaW5lZCBhc1xuICAgICAqIC8vIHtcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwifVxuICAgICAqIC8vIHlvdSBjYW4gdXNlIHRoZSBmb2xsb3dpbmcgdG8gaW50ZXJwb2xhdGUgdGhlIHRleHRcbiAgICAgKiB2YXIgZ3JlZXRpbmdUZXh0ID0gaTE4bi50KCdoZWxsb19uYW1lJywge25hbWU6ICduYW50YXMnfSk7IC8vIEhlbGxvLCBuYW50YXNcbiAgICAgKi9cbiAgICB0IChrZXksIG9wdCkge1xuICAgICAgICByZXR1cm4gcG9seWdsb3QudChrZXksIG9wdCk7XG4gICAgfVxufTsiXX0=