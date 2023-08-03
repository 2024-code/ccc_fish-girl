
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/set_languages/HotUpdate_lan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4745eiZtEVFAoZmIpfTcI+o', 'HotUpdate_lan');
// scripts/three_languages/set_languages/HotUpdate_lan.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Language;
(function (Language) {
    Language["ZH"] = "txt.zh";
    Language["VN"] = "txt.vn";
    Language["EN"] = "txt.en";
})(Language || (Language = {}));
var HotUpdate_lan = /** @class */ (function (_super) {
    __extends(HotUpdate_lan, _super);
    function HotUpdate_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.zhLanguage = {
            0: '确定',
            1: '提示',
            2: '确定',
            3: '游戏版本过低，更新失败。/d 请下载最新版本',
            4: '确认',
            5: '当前版本过低，请前往更新'
        };
        _this.enLanguage = {
            0: 'OK ',
            1: 'Prompt ',
            2: 'OK ',
            3: 'The game version is too low, the update failed. /d Please download the latest version ',
            4: 'Confirm ',
            5: 'The current version is too low, please go to update ',
        };
        _this.inLanguage = {
            0: 'OK ',
            1: 'cepat ',
            2: 'OK ',
            3: 'versi permainannya terlalu rendah, perbaruannya gagal. /d tolong download versi terbaru ',
            4: 'konfirmasi ',
            5: 'versi saat ini terlalu rendah, silakan beralih ke pemutakhiran ',
        };
        return _this;
    }
    HotUpdate_lan.prototype.start = function () {
        this.setLanguage();
    };
    HotUpdate_lan.prototype.setLanguage = function () {
        var language = cc.sys.localStorage.getItem('selectedLanguage') || Language.EN;
        var languageObj = {};
        switch (language) {
            case Language.ZH:
                languageObj = this.zhLanguage;
                break;
            case Language.VN:
                languageObj = this.inLanguage;
                break;
            case Language.EN:
                languageObj = this.enLanguage;
                break;
        }
        this.labelArr.forEach(function (label, index) {
            label.string = languageObj[index] || '';
        });
    };
    __decorate([
        property({ type: [cc.Label], tooltip: '替换的Label' })
    ], HotUpdate_lan.prototype, "labelArr", void 0);
    HotUpdate_lan = __decorate([
        ccclass
    ], HotUpdate_lan);
    return HotUpdate_lan;
}(cc.Component));
exports.default = HotUpdate_lan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxIb3RVcGRhdGVfbGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssUUFJSjtBQUpELFdBQUssUUFBUTtJQUNULHlCQUFhLENBQUE7SUFDYix5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSkksUUFBUSxLQUFSLFFBQVEsUUFJWjtBQUdEO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBd0RDO1FBckRHLGNBQVEsR0FBZSxFQUFFLENBQUM7UUFFMUIsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLHdCQUF3QjtZQUMzQixDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxjQUFjO1NBQ3BCLENBQUM7UUFFRixnQkFBVSxHQUE4QjtZQUNwQyxDQUFDLEVBQUUsS0FBSztZQUNSLENBQUMsRUFBRSxTQUFTO1lBQ1osQ0FBQyxFQUFFLEtBQUs7WUFDUixDQUFDLEVBQUUsd0ZBQXdGO1lBQzNGLENBQUMsRUFBRSxVQUFVO1lBQ2IsQ0FBQyxFQUFFLHNEQUFzRDtTQUM1RCxDQUFDO1FBRUYsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLEtBQUs7WUFDUixDQUFDLEVBQUUsUUFBUTtZQUNYLENBQUMsRUFBRSxLQUFLO1lBQ1IsQ0FBQyxFQUFFLDBGQUEwRjtZQUM3RixDQUFDLEVBQUUsYUFBYTtZQUNoQixDQUFDLEVBQUUsaUVBQWlFO1NBQ3ZFLENBQUM7O0lBMEJOLENBQUM7SUF4QmEsNkJBQUssR0FBZjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sbUNBQVcsR0FBbkI7UUFDSSxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDO1FBRTlFLElBQUksV0FBVyxHQUE4QixFQUFFLENBQUM7UUFDaEQsUUFBUSxRQUFRLEVBQUU7WUFDZCxLQUFLLFFBQVEsQ0FBQyxFQUFFO2dCQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUM5QixNQUFNO1lBQ1YsS0FBSyxRQUFRLENBQUMsRUFBRTtnQkFDWixXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDOUIsTUFBTTtZQUNWLEtBQUssUUFBUSxDQUFDLEVBQUU7Z0JBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQzlCLE1BQU07U0FDYjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUs7WUFDL0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXBERDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUM7bURBQzFCO0lBSFQsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXdEakM7SUFBRCxvQkFBQztDQXhERCxBQXdEQyxDQXhEMEMsRUFBRSxDQUFDLFNBQVMsR0F3RHREO2tCQXhEb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIExhbmd1YWdlIHtcclxuICAgIFpIID0gJ3R4dC56aCcsXHJcbiAgICBWTiA9ICd0eHQudm4nLFxyXG4gICAgRU4gPSAndHh0LmVuJ1xyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb3RVcGRhdGVfbGFuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTGFiZWxdLCB0b29sdGlwOiAn5pu/5o2i55qETGFiZWwnIH0pXHJcbiAgICBsYWJlbEFycjogY2MuTGFiZWxbXSA9IFtdO1xyXG5cclxuICAgIHpoTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ+ehruWumicsXHJcbiAgICAgICAgMTogJ+aPkOekuicsXHJcbiAgICAgICAgMjogJ+ehruWumicsXHJcbiAgICAgICAgMzogJ+a4uOaIj+eJiOacrOi/h+S9ju+8jOabtOaWsOWksei0peOAgi9kIOivt+S4i+i9veacgOaWsOeJiOacrCcsXHJcbiAgICAgICAgNDogJ+ehruiupCcsXHJcbiAgICAgICAgNTogJ+W9k+WJjeeJiOacrOi/h+S9ju+8jOivt+WJjeW+gOabtOaWsCdcclxuICAgIH07XHJcblxyXG4gICAgZW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAnT0sgJyxcclxuICAgICAgICAxOiAnUHJvbXB0ICcsXHJcbiAgICAgICAgMjogJ09LICcsXHJcbiAgICAgICAgMzogJ1RoZSBnYW1lIHZlcnNpb24gaXMgdG9vIGxvdywgdGhlIHVwZGF0ZSBmYWlsZWQuIC9kIFBsZWFzZSBkb3dubG9hZCB0aGUgbGF0ZXN0IHZlcnNpb24gJyxcclxuICAgICAgICA0OiAnQ29uZmlybSAnLFxyXG4gICAgICAgIDU6ICdUaGUgY3VycmVudCB2ZXJzaW9uIGlzIHRvbyBsb3csIHBsZWFzZSBnbyB0byB1cGRhdGUgJyxcclxuICAgIH07XHJcblxyXG4gICAgaW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAnT0sgJyxcclxuICAgICAgICAxOiAnY2VwYXQgJyxcclxuICAgICAgICAyOiAnT0sgJyxcclxuICAgICAgICAzOiAndmVyc2kgcGVybWFpbmFubnlhIHRlcmxhbHUgcmVuZGFoLCBwZXJiYXJ1YW5ueWEgZ2FnYWwuIC9kIHRvbG9uZyBkb3dubG9hZCB2ZXJzaSB0ZXJiYXJ1ICcsXHJcbiAgICAgICAgNDogJ2tvbmZpcm1hc2kgJyxcclxuICAgICAgICA1OiAndmVyc2kgc2FhdCBpbmkgdGVybGFsdSByZW5kYWgsIHNpbGFrYW4gYmVyYWxpaCBrZSBwZW11dGFraGlyYW4gJyxcclxuICAgIH07XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0TGFuZ3VhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldExhbmd1YWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsYW5ndWFnZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0ZWRMYW5ndWFnZScpIHx8IExhbmd1YWdlLkVOO1xyXG5cclxuICAgICAgICBsZXQgbGFuZ3VhZ2VPYmo6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7fTtcclxuICAgICAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuWkg6XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuemhMYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLlZOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmluTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5FTjpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy5lbkxhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxhYmVsQXJyLmZvckVhY2goKGxhYmVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBsYW5ndWFnZU9ialtpbmRleF0gfHwgJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19