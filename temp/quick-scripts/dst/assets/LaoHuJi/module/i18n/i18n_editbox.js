
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/i18n/i18n_editbox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e1867obXcBFjY/ZWshLAiRX', 'i18n_editbox');
// LaoHuJi/module/i18n/i18n_editbox.js

"use strict";

var i18n = require('i18n');

cc.Class({
  "extends": cc.Component,
  properties: {
    EditBox: cc.EditBox,
    textKey: {
      "default": 'TEXT_KEY',
      multiline: true,
      tooltip: 'Enter i18n key here',
      notify: function notify() {
        if (this._sgNode) {
          this._sgNode.setString(this.string);

          this._updateNodeSize();
        }
      }
    }
  },
  update: function update() {
    if (this.language != cc.sys.localStorage.getItem('language')) {
      this.language = cc.sys.localStorage.getItem('language');
      this.EditBox.placeholder = i18n.t(this.textKey);
    }
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxpMThuXFxpMThuX2VkaXRib3guanMiXSwibmFtZXMiOlsiaTE4biIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkVkaXRCb3giLCJ0ZXh0S2V5IiwibXVsdGlsaW5lIiwidG9vbHRpcCIsIm5vdGlmeSIsIl9zZ05vZGUiLCJzZXRTdHJpbmciLCJzdHJpbmciLCJfdXBkYXRlTm9kZVNpemUiLCJ1cGRhdGUiLCJsYW5ndWFnZSIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwbGFjZWhvbGRlciIsInQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBR0osRUFBRSxDQUFDSSxPQURMO0FBRVJDLElBQUFBLE9BQU8sRUFBRTtBQUNMLGlCQUFTLFVBREo7QUFFTEMsTUFBQUEsU0FBUyxFQUFFLElBRk47QUFHTEMsTUFBQUEsT0FBTyxFQUFFLHFCQUhKO0FBSUxDLE1BQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUNoQixZQUFJLEtBQUtDLE9BQVQsRUFBa0I7QUFDZCxlQUFLQSxPQUFMLENBQWFDLFNBQWIsQ0FBdUIsS0FBS0MsTUFBNUI7O0FBQ0EsZUFBS0MsZUFBTDtBQUNIO0FBQ0o7QUFUSTtBQUZELEdBSFA7QUFrQkxDLEVBQUFBLE1BQU0sRUFBRSxrQkFDUjtBQUNJLFFBQUcsS0FBS0MsUUFBTCxJQUFpQmQsRUFBRSxDQUFDZSxHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFVBQTVCLENBQXBCLEVBQ0E7QUFDSSxXQUFLSCxRQUFMLEdBQWdCZCxFQUFFLENBQUNlLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsQ0FBaEI7QUFDQSxXQUFLYixPQUFMLENBQWFjLFdBQWIsR0FBMkJwQixJQUFJLENBQUNxQixDQUFMLENBQU8sS0FBS2QsT0FBWixDQUEzQjtBQUNIO0FBQ0o7QUF6QkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaTE4biA9IHJlcXVpcmUoJ2kxOG4nKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBFZGl0Qm94IDogY2MuRWRpdEJveCxcclxuICAgICAgICB0ZXh0S2V5OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdURVhUX0tFWScsXHJcbiAgICAgICAgICAgIG11bHRpbGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ0VudGVyIGkxOG4ga2V5IGhlcmUnLFxyXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZ05vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZ05vZGUuc2V0U3RyaW5nKHRoaXMuc3RyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVOb2RlU2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoKSBcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmxhbmd1YWdlICE9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZ3VhZ2UnKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2UgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhbmd1YWdlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuRWRpdEJveC5wbGFjZWhvbGRlciA9IGkxOG4udCh0aGlzLnRleHRLZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pOyJdfQ==