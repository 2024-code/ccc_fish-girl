
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/i18n/i18n_sprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6379a0runlNHLEMJFOxjtyR', 'i18n_sprite');
// LaoHuJi/module/i18n/i18n_sprite.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    Sprite: cc.Sprite,
    SpriteFrame_zh: {
      "default": null,
      type: cc.SpriteFrame
    },
    SpriteFrame_my: {
      "default": null,
      type: cc.SpriteFrame
    },
    SpriteFrame_en: {
      "default": null,
      type: cc.SpriteFrame
    },
    SpriteFrame_th: {
      "default": null,
      type: cc.SpriteFrame
    },
    SpriteFrame_fr: {
      "default": null,
      type: cc.SpriteFrame
    },
    SpriteFrame_es: {
      "default": null,
      type: cc.SpriteFrame
    },
    SpriteFrame_vn: {
      "default": null,
      type: cc.SpriteFrame
    },
    SpriteFrame_kp: {
      "default": null,
      type: cc.SpriteFrame
    },
    SpriteFrame_in: {
      "default": null,
      type: cc.SpriteFrame
    },
    SpriteFrame_id: {
      "default": null,
      type: cc.SpriteFrame
    }
  },
  update: function update() {
    if (this.language != cc.sys.localStorage.getItem('language')) {
      this.language = cc.sys.localStorage.getItem('language');
      this.ChangeLanguage(this.language);
    }
  },
  ChangeLanguage: function ChangeLanguage(language) {
    switch (language) {
      case 'zh':
        this.Sprite.spriteFrame = this.SpriteFrame_zh;
        break;

      case 'fr':
        this.Sprite.spriteFrame = this.SpriteFrame_fr;
        break;

      case 'th':
        this.Sprite.spriteFrame = this.SpriteFrame_th;
        break;

      case 'es':
        this.Sprite.spriteFrame = this.SpriteFrame_es;
        break;

      case 'vn':
        this.Sprite.spriteFrame = this.SpriteFrame_vn;
        break;

      case 'my':
        this.Sprite.spriteFrame = this.SpriteFrame_my;
        break;

      case 'kp':
        this.Sprite.spriteFrame = this.SpriteFrame_kp;
        break;

      case 'in':
        this.Sprite.spriteFrame = this.SpriteFrame_in;
        break;

      case 'id':
        this.Sprite.spriteFrame = this.SpriteFrame_id;
        break;

      case 'en':
      default:
        this.Sprite.spriteFrame = this.SpriteFrame_en;
        break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxpMThuXFxpMThuX3Nwcml0ZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIlNwcml0ZSIsIlNwcml0ZUZyYW1lX3poIiwidHlwZSIsIlNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWVfbXkiLCJTcHJpdGVGcmFtZV9lbiIsIlNwcml0ZUZyYW1lX3RoIiwiU3ByaXRlRnJhbWVfZnIiLCJTcHJpdGVGcmFtZV9lcyIsIlNwcml0ZUZyYW1lX3ZuIiwiU3ByaXRlRnJhbWVfa3AiLCJTcHJpdGVGcmFtZV9pbiIsIlNwcml0ZUZyYW1lX2lkIiwidXBkYXRlIiwibGFuZ3VhZ2UiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiQ2hhbmdlTGFuZ3VhZ2UiLCJzcHJpdGVGcmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE1BQU0sRUFBSUosRUFBRSxDQUFDSSxNQURMO0FBRVJDLElBQUFBLGNBQWMsRUFBRztBQUNiLGlCQUFRLElBREs7QUFFYkMsTUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNPO0FBRkssS0FGVDtBQU1SQyxJQUFBQSxjQUFjLEVBQUc7QUFDYixpQkFBUSxJQURLO0FBRWJGLE1BQUFBLElBQUksRUFBQ04sRUFBRSxDQUFDTztBQUZLLEtBTlQ7QUFVUkUsSUFBQUEsY0FBYyxFQUFHO0FBQ2IsaUJBQVEsSUFESztBQUViSCxNQUFBQSxJQUFJLEVBQUNOLEVBQUUsQ0FBQ087QUFGSyxLQVZUO0FBY2RHLElBQUFBLGNBQWMsRUFBRztBQUNQLGlCQUFRLElBREQ7QUFFUEosTUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNPO0FBRkQsS0FkSDtBQWtCZEksSUFBQUEsY0FBYyxFQUFHO0FBQ1AsaUJBQVEsSUFERDtBQUVQTCxNQUFBQSxJQUFJLEVBQUNOLEVBQUUsQ0FBQ087QUFGRCxLQWxCSDtBQXNCZEssSUFBQUEsY0FBYyxFQUFHO0FBQ1AsaUJBQVEsSUFERDtBQUVQTixNQUFBQSxJQUFJLEVBQUNOLEVBQUUsQ0FBQ087QUFGRCxLQXRCSDtBQTBCZE0sSUFBQUEsY0FBYyxFQUFHO0FBQ1AsaUJBQVEsSUFERDtBQUVQUCxNQUFBQSxJQUFJLEVBQUNOLEVBQUUsQ0FBQ087QUFGRCxLQTFCSDtBQThCZE8sSUFBQUEsY0FBYyxFQUFHO0FBQ1AsaUJBQVEsSUFERDtBQUVQUixNQUFBQSxJQUFJLEVBQUNOLEVBQUUsQ0FBQ087QUFGRCxLQTlCSDtBQWtDZFEsSUFBQUEsY0FBYyxFQUFHO0FBQ1AsaUJBQVEsSUFERDtBQUVQVCxNQUFBQSxJQUFJLEVBQUNOLEVBQUUsQ0FBQ087QUFGRCxLQWxDSDtBQXNDZFMsSUFBQUEsY0FBYyxFQUFHO0FBQ1AsaUJBQVEsSUFERDtBQUVQVixNQUFBQSxJQUFJLEVBQUNOLEVBQUUsQ0FBQ087QUFGRDtBQXRDSCxHQUhQO0FBZ0RMVSxFQUFBQSxNQUFNLEVBQUUsa0JBQ1I7QUFDSSxRQUFHLEtBQUtDLFFBQUwsSUFBaUJsQixFQUFFLENBQUNtQixHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFVBQTVCLENBQXBCLEVBQ0E7QUFDSSxXQUFLSCxRQUFMLEdBQWdCbEIsRUFBRSxDQUFDbUIsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixDQUFoQjtBQUNBLFdBQUtDLGNBQUwsQ0FBb0IsS0FBS0osUUFBekI7QUFDSDtBQUNKLEdBdkRJO0FBeURMSSxFQUFBQSxjQUFjLEVBQUUsd0JBQVVKLFFBQVYsRUFDaEI7QUFDSSxZQUFPQSxRQUFQO0FBRUksV0FBSyxJQUFMO0FBQ0EsYUFBS2QsTUFBTCxDQUFZbUIsV0FBWixHQUEwQixLQUFLbEIsY0FBL0I7QUFDQTs7QUFDQSxXQUFLLElBQUw7QUFDQSxhQUFLRCxNQUFMLENBQVltQixXQUFaLEdBQTBCLEtBQUtaLGNBQS9CO0FBQ0E7O0FBQ0EsV0FBSyxJQUFMO0FBQ0EsYUFBS1AsTUFBTCxDQUFZbUIsV0FBWixHQUEwQixLQUFLYixjQUEvQjtBQUNBOztBQUNBLFdBQUssSUFBTDtBQUNBLGFBQUtOLE1BQUwsQ0FBWW1CLFdBQVosR0FBMEIsS0FBS1gsY0FBL0I7QUFDQTs7QUFDQSxXQUFLLElBQUw7QUFDQSxhQUFLUixNQUFMLENBQVltQixXQUFaLEdBQTBCLEtBQUtWLGNBQS9CO0FBQ0E7O0FBQ0EsV0FBSyxJQUFMO0FBQ0EsYUFBS1QsTUFBTCxDQUFZbUIsV0FBWixHQUEwQixLQUFLZixjQUEvQjtBQUNBOztBQUNULFdBQUssSUFBTDtBQUNTLGFBQUtKLE1BQUwsQ0FBWW1CLFdBQVosR0FBMEIsS0FBS1QsY0FBL0I7QUFDQTs7QUFDVCxXQUFLLElBQUw7QUFDUyxhQUFLVixNQUFMLENBQVltQixXQUFaLEdBQTBCLEtBQUtSLGNBQS9CO0FBQ0E7O0FBQ1QsV0FBSyxJQUFMO0FBQ1MsYUFBS1gsTUFBTCxDQUFZbUIsV0FBWixHQUEwQixLQUFLUCxjQUEvQjtBQUNBOztBQUNBLFdBQUssSUFBTDtBQUNBO0FBQ0EsYUFBS1osTUFBTCxDQUFZbUIsV0FBWixHQUEwQixLQUFLZCxjQUEvQjtBQUNBO0FBaENKO0FBa0NIO0FBN0ZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgU3ByaXRlIDogIGNjLlNwcml0ZSxcclxuICAgICAgICBTcHJpdGVGcmFtZV96aCA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSAsXHJcbiAgICAgICAgU3ByaXRlRnJhbWVfbXkgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0gLFxyXG4gICAgICAgIFNwcml0ZUZyYW1lX2VuIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9ICxcclxuXHRcdFNwcml0ZUZyYW1lX3RoIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9ICxcclxuXHRcdFNwcml0ZUZyYW1lX2ZyIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9ICxcclxuXHRcdFNwcml0ZUZyYW1lX2VzIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9ICxcclxuXHRcdFNwcml0ZUZyYW1lX3ZuIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9ICxcclxuXHRcdFNwcml0ZUZyYW1lX2twIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9ICxcclxuXHRcdFNwcml0ZUZyYW1lX2luIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9ICxcclxuXHRcdFNwcml0ZUZyYW1lX2lkIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9ICxcclxuXHRcdFxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubGFuZ3VhZ2UgIT0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYW5ndWFnZScpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZ3VhZ2UnKTtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VMYW5ndWFnZSh0aGlzLmxhbmd1YWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENoYW5nZUxhbmd1YWdlOiBmdW5jdGlvbiAobGFuZ3VhZ2UpIFxyXG4gICAge1xyXG4gICAgICAgIHN3aXRjaChsYW5ndWFnZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3poJzpcclxuICAgICAgICAgICAgdGhpcy5TcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLlNwcml0ZUZyYW1lX3poO1xyXG4gICAgICAgICAgICBicmVhazsgICBcclxuICAgICAgICAgICAgY2FzZSAnZnInOlxyXG4gICAgICAgICAgICB0aGlzLlNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuU3ByaXRlRnJhbWVfZnI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0aCc6XHJcbiAgICAgICAgICAgIHRoaXMuU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5TcHJpdGVGcmFtZV90aDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VzJzpcclxuICAgICAgICAgICAgdGhpcy5TcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLlNwcml0ZUZyYW1lX2VzO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndm4nOlxyXG4gICAgICAgICAgICB0aGlzLlNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuU3ByaXRlRnJhbWVfdm47XHJcbiAgICAgICAgICAgIGJyZWFrO1x0XHRcdFxyXG4gICAgICAgICAgICBjYXNlICdteSc6XHJcbiAgICAgICAgICAgIHRoaXMuU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5TcHJpdGVGcmFtZV9teTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ2twJzpcclxuICAgICAgICAgICAgdGhpcy5TcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLlNwcml0ZUZyYW1lX2twO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHRcdFx0Y2FzZSAnaW4nOlxyXG4gICAgICAgICAgICB0aGlzLlNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuU3ByaXRlRnJhbWVfaW47XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cdFx0XHRjYXNlICdpZCc6XHJcbiAgICAgICAgICAgIHRoaXMuU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5TcHJpdGVGcmFtZV9pZDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VuJzpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhpcy5TcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLlNwcml0ZUZyYW1lX2VuO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTsiXX0=