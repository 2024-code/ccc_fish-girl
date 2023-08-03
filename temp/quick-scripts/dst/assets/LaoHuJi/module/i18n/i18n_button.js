
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/i18n/i18n_button.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1ab41NteutHv7WdA0+VKOut', 'i18n_button');
// LaoHuJi/module/i18n/i18n_button.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    Button: {
      "default": null,
      tooltip: '要应用多语言的按钮组件',
      type: cc.Button
    },
    normalSprite_zh: {
      "default": null,
      tooltip: '（中文）普通状态下按钮所显示的 Sprite',
      type: cc.SpriteFrame
    },
    normalSprite_en: {
      "default": null,
      tooltip: '（英文）普通状态下按钮所显示的 Sprite',
      type: cc.SpriteFrame
    },
    normalSprite_my: {
      "default": null,
      tooltip: '（马来文）普通状态下按钮所显示的 Sprite',
      type: cc.SpriteFrame
    },
    pressedSprite_zh: {
      "default": null,
      tooltip: '（中文）按下状态时按钮所显示的 Sprite',
      type: cc.SpriteFrame
    },
    pressedSprite_en: {
      "default": null,
      tooltip: '（英文）按下状态时按钮所显示的 Sprite',
      type: cc.SpriteFrame
    },
    pressedSprite_my: {
      "default": null,
      tooltip: '（马来文）按下状态时按钮所显示的 Sprite',
      type: cc.SpriteFrame
    },
    hoverSprite_zh: {
      "default": null,
      tooltip: '（中文）悬停状态下按钮所显示的 Sprite',
      type: cc.SpriteFrame
    },
    hoverSprite_en: {
      "default": null,
      tooltip: '（英文）悬停状态下按钮所显示的 Sprite',
      type: cc.SpriteFrame
    },
    hoverSprite_my: {
      "default": null,
      tooltip: '（马来文）悬停状态下按钮所显示的 Sprite',
      type: cc.SpriteFrame
    },
    disabledSprite_zh: {
      "default": null,
      tooltip: '（中文）禁用状态下按钮所显示的 Sprite',
      type: cc.SpriteFrame
    },
    disabledSprite_en: {
      "default": null,
      tooltip: '（英文）禁用状态下按钮所显示的 Sprite',
      type: cc.SpriteFrame
    },
    disabledSprite_my: {
      "default": null,
      tooltip: '（马来文）禁用状态下按钮所显示的 Sprite',
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
        this.Button.normalSprite = this.normalSprite_zh;
        this.Button.pressedSprite = this.pressedSprite_zh;
        this.Button.hoverSprite = this.hoverSprite_zh;
        this.Button.disabledSprite = this.disabledSprite_zh;
        break;

      case 'my':
        this.Button.normalSprite = this.normalSprite_my;
        this.Button.pressedSprite = this.pressedSprite_my;
        this.Button.hoverSprite = this.hoverSprite_my;
        this.Button.disabledSprite = this.disabledSprite_my;
        break;

      case 'en':
      default:
        this.Button.normalSprite = this.normalSprite_en;
        this.Button.pressedSprite = this.pressedSprite_en;
        this.Button.hoverSprite = this.hoverSprite_en;
        this.Button.disabledSprite = this.disabledSprite_en;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcTGFvSHVKaVxcbW9kdWxlXFxpMThuXFxpMThuX2J1dHRvbi5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkJ1dHRvbiIsInRvb2x0aXAiLCJ0eXBlIiwibm9ybWFsU3ByaXRlX3poIiwiU3ByaXRlRnJhbWUiLCJub3JtYWxTcHJpdGVfZW4iLCJub3JtYWxTcHJpdGVfbXkiLCJwcmVzc2VkU3ByaXRlX3poIiwicHJlc3NlZFNwcml0ZV9lbiIsInByZXNzZWRTcHJpdGVfbXkiLCJob3ZlclNwcml0ZV96aCIsImhvdmVyU3ByaXRlX2VuIiwiaG92ZXJTcHJpdGVfbXkiLCJkaXNhYmxlZFNwcml0ZV96aCIsImRpc2FibGVkU3ByaXRlX2VuIiwiZGlzYWJsZWRTcHJpdGVfbXkiLCJ1cGRhdGUiLCJsYW5ndWFnZSIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJDaGFuZ2VMYW5ndWFnZSIsIm5vcm1hbFNwcml0ZSIsInByZXNzZWRTcHJpdGUiLCJob3ZlclNwcml0ZSIsImRpc2FibGVkU3ByaXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVEsSUFESjtBQUVKQyxNQUFBQSxPQUFPLEVBQUUsYUFGTDtBQUdKQyxNQUFBQSxJQUFJLEVBQUNOLEVBQUUsQ0FBQ0k7QUFISixLQURBO0FBT1JHLElBQUFBLGVBQWUsRUFBRztBQUNkLGlCQUFRLElBRE07QUFFZEYsTUFBQUEsT0FBTyxFQUFFLHdCQUZLO0FBR2RDLE1BQUFBLElBQUksRUFBQ04sRUFBRSxDQUFDUTtBQUhNLEtBUFY7QUFZUkMsSUFBQUEsZUFBZSxFQUFHO0FBQ2QsaUJBQVEsSUFETTtBQUVkSixNQUFBQSxPQUFPLEVBQUUsd0JBRks7QUFHZEMsTUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNRO0FBSE0sS0FaVjtBQWlCUkUsSUFBQUEsZUFBZSxFQUFHO0FBQ2QsaUJBQVEsSUFETTtBQUVkTCxNQUFBQSxPQUFPLEVBQUUseUJBRks7QUFHZEMsTUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNRO0FBSE0sS0FqQlY7QUF1QlJHLElBQUFBLGdCQUFnQixFQUFHO0FBQ2YsaUJBQVEsSUFETztBQUVmTixNQUFBQSxPQUFPLEVBQUUsd0JBRk07QUFHZkMsTUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNRO0FBSE8sS0F2Qlg7QUE0QlJJLElBQUFBLGdCQUFnQixFQUFHO0FBQ2YsaUJBQVEsSUFETztBQUVmUCxNQUFBQSxPQUFPLEVBQUUsd0JBRk07QUFHZkMsTUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNRO0FBSE8sS0E1Qlg7QUFpQ1JLLElBQUFBLGdCQUFnQixFQUFHO0FBQ2YsaUJBQVEsSUFETztBQUVmUixNQUFBQSxPQUFPLEVBQUUseUJBRk07QUFHZkMsTUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNRO0FBSE8sS0FqQ1g7QUF1Q1JNLElBQUFBLGNBQWMsRUFBRztBQUNiLGlCQUFRLElBREs7QUFFYlQsTUFBQUEsT0FBTyxFQUFFLHdCQUZJO0FBR2JDLE1BQUFBLElBQUksRUFBQ04sRUFBRSxDQUFDUTtBQUhLLEtBdkNUO0FBNENSTyxJQUFBQSxjQUFjLEVBQUc7QUFDYixpQkFBUSxJQURLO0FBRWJWLE1BQUFBLE9BQU8sRUFBRSx3QkFGSTtBQUdiQyxNQUFBQSxJQUFJLEVBQUNOLEVBQUUsQ0FBQ1E7QUFISyxLQTVDVDtBQWlEUlEsSUFBQUEsY0FBYyxFQUFHO0FBQ2IsaUJBQVEsSUFESztBQUViWCxNQUFBQSxPQUFPLEVBQUUseUJBRkk7QUFHYkMsTUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNRO0FBSEssS0FqRFQ7QUF1RFJTLElBQUFBLGlCQUFpQixFQUFHO0FBQ2hCLGlCQUFRLElBRFE7QUFFaEJaLE1BQUFBLE9BQU8sRUFBRSx3QkFGTztBQUdoQkMsTUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNRO0FBSFEsS0F2RFo7QUE0RFJVLElBQUFBLGlCQUFpQixFQUFHO0FBQ2hCLGlCQUFRLElBRFE7QUFFaEJiLE1BQUFBLE9BQU8sRUFBRSx3QkFGTztBQUdoQkMsTUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNRO0FBSFEsS0E1RFo7QUFpRVJXLElBQUFBLGlCQUFpQixFQUFHO0FBQ2hCLGlCQUFRLElBRFE7QUFFaEJkLE1BQUFBLE9BQU8sRUFBRSx5QkFGTztBQUdoQkMsTUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNRO0FBSFE7QUFqRVosR0FIUDtBQTJFTFksRUFBQUEsTUFBTSxFQUFFLGtCQUNSO0FBQ0ksUUFBRyxLQUFLQyxRQUFMLElBQWlCckIsRUFBRSxDQUFDc0IsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixDQUFwQixFQUNBO0FBQ0ksV0FBS0gsUUFBTCxHQUFnQnJCLEVBQUUsQ0FBQ3NCLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsQ0FBaEI7QUFDQSxXQUFLQyxjQUFMLENBQW9CLEtBQUtKLFFBQXpCO0FBQ0g7QUFDSixHQWxGSTtBQW9GTEksRUFBQUEsY0FBYyxFQUFFLHdCQUFVSixRQUFWLEVBQ2hCO0FBQ0ksWUFBT0EsUUFBUDtBQUVJLFdBQUssSUFBTDtBQUNBLGFBQUtqQixNQUFMLENBQVlzQixZQUFaLEdBQTJCLEtBQUtuQixlQUFoQztBQUNBLGFBQUtILE1BQUwsQ0FBWXVCLGFBQVosR0FBNEIsS0FBS2hCLGdCQUFqQztBQUNBLGFBQUtQLE1BQUwsQ0FBWXdCLFdBQVosR0FBMEIsS0FBS2QsY0FBL0I7QUFDQSxhQUFLVixNQUFMLENBQVl5QixjQUFaLEdBQTZCLEtBQUtaLGlCQUFsQztBQUNBOztBQUNBLFdBQUssSUFBTDtBQUNBLGFBQUtiLE1BQUwsQ0FBWXNCLFlBQVosR0FBMkIsS0FBS2hCLGVBQWhDO0FBQ0EsYUFBS04sTUFBTCxDQUFZdUIsYUFBWixHQUE0QixLQUFLZCxnQkFBakM7QUFDQSxhQUFLVCxNQUFMLENBQVl3QixXQUFaLEdBQTBCLEtBQUtaLGNBQS9CO0FBQ0EsYUFBS1osTUFBTCxDQUFZeUIsY0FBWixHQUE2QixLQUFLVixpQkFBbEM7QUFDQTs7QUFDQSxXQUFLLElBQUw7QUFDQTtBQUNBLGFBQUtmLE1BQUwsQ0FBWXNCLFlBQVosR0FBMkIsS0FBS2pCLGVBQWhDO0FBQ0EsYUFBS0wsTUFBTCxDQUFZdUIsYUFBWixHQUE0QixLQUFLZixnQkFBakM7QUFDQSxhQUFLUixNQUFMLENBQVl3QixXQUFaLEdBQTBCLEtBQUtiLGNBQS9CO0FBQ0EsYUFBS1gsTUFBTCxDQUFZeUIsY0FBWixHQUE2QixLQUFLWCxpQkFBbEM7QUFDQTtBQXBCSjtBQXNCSDtBQTVHSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIEJ1dHRvbiA6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfopoHlupTnlKjlpJror63oqIDnmoTmjInpkq7nu4Tku7YnLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkJ1dHRvblxyXG4gICAgICAgIH0gLCBcclxuXHJcbiAgICAgICAgbm9ybWFsU3ByaXRlX3poIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfvvIjkuK3mlofvvInmma7pgJrnirbmgIHkuIvmjInpkq7miYDmmL7npLrnmoQgU3ByaXRlJyxcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0gLFxyXG4gICAgICAgIG5vcm1hbFNwcml0ZV9lbiA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAn77yI6Iux5paH77yJ5pmu6YCa54q25oCB5LiL5oyJ6ZKu5omA5pi+56S655qEIFNwcml0ZScsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9ICxcclxuICAgICAgICBub3JtYWxTcHJpdGVfbXkgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ++8iOmprOadpeaWh++8ieaZrumAmueKtuaAgeS4i+aMiemSruaJgOaYvuekuueahCBTcHJpdGUnLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSAsXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJlc3NlZFNwcml0ZV96aCA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAn77yI5Lit5paH77yJ5oyJ5LiL54q25oCB5pe25oyJ6ZKu5omA5pi+56S655qEIFNwcml0ZScsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlRnJhbWVcclxuICAgICAgICB9ICxcclxuICAgICAgICBwcmVzc2VkU3ByaXRlX2VuIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfvvIjoi7HmlofvvInmjInkuIvnirbmgIHml7bmjInpkq7miYDmmL7npLrnmoQgU3ByaXRlJyxcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0gLFxyXG4gICAgICAgIHByZXNzZWRTcHJpdGVfbXkgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ++8iOmprOadpeaWh++8ieaMieS4i+eKtuaAgeaXtuaMiemSruaJgOaYvuekuueahCBTcHJpdGUnLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSAsXHJcbiAgICAgICAgXHJcbiAgICAgICAgaG92ZXJTcHJpdGVfemggOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ++8iOS4reaWh++8ieaCrOWBnOeKtuaAgeS4i+aMiemSruaJgOaYvuekuueahCBTcHJpdGUnLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSAsXHJcbiAgICAgICAgaG92ZXJTcHJpdGVfZW4gOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ++8iOiLseaWh++8ieaCrOWBnOeKtuaAgeS4i+aMiemSruaJgOaYvuekuueahCBTcHJpdGUnLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSAsXHJcbiAgICAgICAgaG92ZXJTcHJpdGVfbXkgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ++8iOmprOadpeaWh++8ieaCrOWBnOeKtuaAgeS4i+aMiemSruaJgOaYvuekuueahCBTcHJpdGUnLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSAsXHJcblxyXG4gICAgICAgIGRpc2FibGVkU3ByaXRlX3poIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfvvIjkuK3mlofvvInnpoHnlKjnirbmgIHkuIvmjInpkq7miYDmmL7npLrnmoQgU3ByaXRlJyxcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0gLFxyXG4gICAgICAgIGRpc2FibGVkU3ByaXRlX2VuIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfvvIjoi7HmlofvvInnpoHnlKjnirbmgIHkuIvmjInpkq7miYDmmL7npLrnmoQgU3ByaXRlJyxcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0gLFxyXG4gICAgICAgIGRpc2FibGVkU3ByaXRlX215IDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfvvIjpqazmnaXmlofvvInnpoHnlKjnirbmgIHkuIvmjInpkq7miYDmmL7npLrnmoQgU3ByaXRlJyxcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0gLFxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubGFuZ3VhZ2UgIT0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYW5ndWFnZScpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZ3VhZ2UnKTtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VMYW5ndWFnZSh0aGlzLmxhbmd1YWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENoYW5nZUxhbmd1YWdlOiBmdW5jdGlvbiAobGFuZ3VhZ2UpIFxyXG4gICAge1xyXG4gICAgICAgIHN3aXRjaChsYW5ndWFnZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3poJzpcclxuICAgICAgICAgICAgdGhpcy5CdXR0b24ubm9ybWFsU3ByaXRlID0gdGhpcy5ub3JtYWxTcHJpdGVfemg7XHJcbiAgICAgICAgICAgIHRoaXMuQnV0dG9uLnByZXNzZWRTcHJpdGUgPSB0aGlzLnByZXNzZWRTcHJpdGVfemg7XHJcbiAgICAgICAgICAgIHRoaXMuQnV0dG9uLmhvdmVyU3ByaXRlID0gdGhpcy5ob3ZlclNwcml0ZV96aDtcclxuICAgICAgICAgICAgdGhpcy5CdXR0b24uZGlzYWJsZWRTcHJpdGUgPSB0aGlzLmRpc2FibGVkU3ByaXRlX3poO1xyXG4gICAgICAgICAgICBicmVhazsgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSAnbXknOlxyXG4gICAgICAgICAgICB0aGlzLkJ1dHRvbi5ub3JtYWxTcHJpdGUgPSB0aGlzLm5vcm1hbFNwcml0ZV9teTtcclxuICAgICAgICAgICAgdGhpcy5CdXR0b24ucHJlc3NlZFNwcml0ZSA9IHRoaXMucHJlc3NlZFNwcml0ZV9teTtcclxuICAgICAgICAgICAgdGhpcy5CdXR0b24uaG92ZXJTcHJpdGUgPSB0aGlzLmhvdmVyU3ByaXRlX215O1xyXG4gICAgICAgICAgICB0aGlzLkJ1dHRvbi5kaXNhYmxlZFNwcml0ZSA9IHRoaXMuZGlzYWJsZWRTcHJpdGVfbXk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdlbic6XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRoaXMuQnV0dG9uLm5vcm1hbFNwcml0ZSA9IHRoaXMubm9ybWFsU3ByaXRlX2VuO1xyXG4gICAgICAgICAgICB0aGlzLkJ1dHRvbi5wcmVzc2VkU3ByaXRlID0gdGhpcy5wcmVzc2VkU3ByaXRlX2VuO1xyXG4gICAgICAgICAgICB0aGlzLkJ1dHRvbi5ob3ZlclNwcml0ZSA9IHRoaXMuaG92ZXJTcHJpdGVfZW47XHJcbiAgICAgICAgICAgIHRoaXMuQnV0dG9uLmRpc2FibGVkU3ByaXRlID0gdGhpcy5kaXNhYmxlZFNwcml0ZV9lbjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7Il19