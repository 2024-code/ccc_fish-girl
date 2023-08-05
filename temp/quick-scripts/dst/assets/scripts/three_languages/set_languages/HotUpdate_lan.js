
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
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_6) {
            window.globalData_6 = {};
        }
        window.globalData_6.labelArr = this.labelArr;
        window.globalData_6.spriteArr = this.spriteArr;
        window.globalData_6.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_6.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_6.spriteFrameArr_vn = this.spriteFrameArr_vn;
        this.setLanguage();
    };
    HotUpdate_lan.prototype.setLanguage = function () {
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('HotUpdate_lan');
        var globalLabelArr = window.globalData_6.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;
        var globalSpriteArr = window.globalData_6.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;
        var globalSpriteFrameArr_zh = window.globalData_6.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;
        var globalSpriteFrameArr_en = window.globalData_6.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;
        var globalSpriteFrameArr_vn = window.globalData_6.spriteFrameArr_vn || [];
        this.spriteFrameArr_vn = globalSpriteFrameArr_vn.length ? globalSpriteFrameArr_vn : this.spriteFrameArr_vn;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxIb3RVcGRhdGVfbGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssUUFJSjtBQUpELFdBQUssUUFBUTtJQUNULHlCQUFhLENBQUE7SUFDYix5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSkksUUFBUSxLQUFSLFFBQVEsUUFJWjtBQVNEO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBb0ZDO1FBakZHLGNBQVEsR0FBZSxFQUFFLENBQUM7UUFFMUIsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLHdCQUF3QjtZQUMzQixDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxjQUFjO1NBQ3BCLENBQUM7UUFFRixnQkFBVSxHQUE4QjtZQUNwQyxDQUFDLEVBQUUsS0FBSztZQUNSLENBQUMsRUFBRSxTQUFTO1lBQ1osQ0FBQyxFQUFFLEtBQUs7WUFDUixDQUFDLEVBQUUsd0ZBQXdGO1lBQzNGLENBQUMsRUFBRSxVQUFVO1lBQ2IsQ0FBQyxFQUFFLHNEQUFzRDtTQUM1RCxDQUFDO1FBRUYsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLEtBQUs7WUFDUixDQUFDLEVBQUUsUUFBUTtZQUNYLENBQUMsRUFBRSxLQUFLO1lBQ1IsQ0FBQyxFQUFFLDBGQUEwRjtZQUM3RixDQUFDLEVBQUUsYUFBYTtZQUNoQixDQUFDLEVBQUUsaUVBQWlFO1NBQ3ZFLENBQUM7O0lBc0ROLENBQUM7SUFwRGEsNkJBQUssR0FBZjtRQUNJLGtCQUFrQjtR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QyxLQUFLLEVBQUUsS0FBSztZQUMvQixLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBaEZEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQzttREFDMUI7SUFIVCxhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBb0ZqQztJQUFELG9CQUFDO0NBcEZELEFBb0ZDLENBcEYwQyxFQUFFLENBQUMsU0FBUyxHQW9GdEQ7a0JBcEZvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgWkggPSAndHh0LnpoJyxcclxuICAgIFZOID0gJ3R4dC52bicsXHJcbiAgICBFTiA9ICd0eHQuZW4nXHJcbn1cclxuaW50ZXJmYWNlIEdsb2JhbERhdGFfNiB7XHJcbiAgICBsYWJlbEFycjogY2MuTGFiZWxbXSxcclxuICAgIHNwcml0ZUFycjogY2MuU3ByaXRlW10sXHJcbiAgICBzcHJpdGVGcmFtZUFycl96aDogY2MuU3ByaXRlRnJhbWVbXSxcclxuICAgIHNwcml0ZUZyYW1lQXJyX2VuOiBjYy5TcHJpdGVGcmFtZVtdLFxyXG4gICAgc3ByaXRlRnJhbWVBcnJfdm46IGNjLlNwcml0ZUZyYW1lW11cclxufVxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb3RVcGRhdGVfbGFuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTGFiZWxdLCB0b29sdGlwOiAn5pu/5o2i55qETGFiZWwnIH0pXHJcbiAgICBsYWJlbEFycjogY2MuTGFiZWxbXSA9IFtdO1xyXG5cclxuICAgIHpoTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ+ehruWumicsXHJcbiAgICAgICAgMTogJ+aPkOekuicsXHJcbiAgICAgICAgMjogJ+ehruWumicsXHJcbiAgICAgICAgMzogJ+a4uOaIj+eJiOacrOi/h+S9ju+8jOabtOaWsOWksei0peOAgi9kIOivt+S4i+i9veacgOaWsOeJiOacrCcsXHJcbiAgICAgICAgNDogJ+ehruiupCcsXHJcbiAgICAgICAgNTogJ+W9k+WJjeeJiOacrOi/h+S9ju+8jOivt+WJjeW+gOabtOaWsCdcclxuICAgIH07XHJcblxyXG4gICAgZW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAnT0sgJyxcclxuICAgICAgICAxOiAnUHJvbXB0ICcsXHJcbiAgICAgICAgMjogJ09LICcsXHJcbiAgICAgICAgMzogJ1RoZSBnYW1lIHZlcnNpb24gaXMgdG9vIGxvdywgdGhlIHVwZGF0ZSBmYWlsZWQuIC9kIFBsZWFzZSBkb3dubG9hZCB0aGUgbGF0ZXN0IHZlcnNpb24gJyxcclxuICAgICAgICA0OiAnQ29uZmlybSAnLFxyXG4gICAgICAgIDU6ICdUaGUgY3VycmVudCB2ZXJzaW9uIGlzIHRvbyBsb3csIHBsZWFzZSBnbyB0byB1cGRhdGUgJyxcclxuICAgIH07XHJcblxyXG4gICAgaW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAnT0sgJyxcclxuICAgICAgICAxOiAnY2VwYXQgJyxcclxuICAgICAgICAyOiAnT0sgJyxcclxuICAgICAgICAzOiAndmVyc2kgcGVybWFpbmFubnlhIHRlcmxhbHUgcmVuZGFoLCBwZXJiYXJ1YW5ueWEgZ2FnYWwuIC9kIHRvbG9uZyBkb3dubG9hZCB2ZXJzaSB0ZXJiYXJ1ICcsXHJcbiAgICAgICAgNDogJ2tvbmZpcm1hc2kgJyxcclxuICAgICAgICA1OiAndmVyc2kgc2FhdCBpbmkgdGVybGFsdSByZW5kYWgsIHNpbGFrYW4gYmVyYWxpaCBrZSBwZW11dGFraGlyYW4gJyxcclxuICAgIH07XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIOWwhumcgOimgeS/neeVmeeahOWxnuaAp+i1i+WAvOe7meWFqOWxgOWvueixoVxyXG4gICAgICAgIGlmICghd2luZG93Lmdsb2JhbERhdGFfNikge1xyXG4gICAgICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV82ID0ge30gYXMgR2xvYmFsRGF0YV82O1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV82LmxhYmVsQXJyID0gdGhpcy5sYWJlbEFycjtcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV82LnNwcml0ZUFyciA9IHRoaXMuc3ByaXRlQXJyO1xyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzYuc3ByaXRlRnJhbWVBcnJfemggPSB0aGlzLnNwcml0ZUZyYW1lQXJyX3poO1xyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzYuc3ByaXRlRnJhbWVBcnJfZW4gPSB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuO1xyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzYuc3ByaXRlRnJhbWVBcnJfdm4gPSB0aGlzLnNwcml0ZUZyYW1lQXJyX3ZuO1xyXG5cclxuICAgICAgICB0aGlzLnNldExhbmd1YWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRMYW5ndWFnZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwZXJzaXN0Tm9kZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ2luaXRfbGFuZ3VhZ2UnKTtcclxuICAgICAgICBjb25zdCB5b3VyU2NyaXB0Q29tcG9uZW50ID0gcGVyc2lzdE5vZGUuZ2V0Q29tcG9uZW50KCdIb3RVcGRhdGVfbGFuJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbExhYmVsQXJyID0gd2luZG93Lmdsb2JhbERhdGFfNi5sYWJlbEFyciB8fCBbXTtcclxuICAgICAgICB0aGlzLmxhYmVsQXJyID0gZ2xvYmFsTGFiZWxBcnIubGVuZ3RoID8gZ2xvYmFsTGFiZWxBcnIgOiB0aGlzLmxhYmVsQXJyO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVBcnIgPSB3aW5kb3cuZ2xvYmFsRGF0YV82LnNwcml0ZUFyciB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUFyciA9IGdsb2JhbFNwcml0ZUFyci5sZW5ndGggPyBnbG9iYWxTcHJpdGVBcnIgOiB0aGlzLnNwcml0ZUFycjtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsU3ByaXRlRnJhbWVBcnJfemggPSB3aW5kb3cuZ2xvYmFsRGF0YV82LnNwcml0ZUZyYW1lQXJyX3poIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVBcnJfemggPSBnbG9iYWxTcHJpdGVGcmFtZUFycl96aC5sZW5ndGggPyBnbG9iYWxTcHJpdGVGcmFtZUFycl96aCA6IHRoaXMuc3ByaXRlRnJhbWVBcnJfemg7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbFNwcml0ZUZyYW1lQXJyX2VuID0gd2luZG93Lmdsb2JhbERhdGFfNi5zcHJpdGVGcmFtZUFycl9lbiB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuID0gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4ubGVuZ3RoID8gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4gOiB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVGcmFtZUFycl92biA9IHdpbmRvdy5nbG9iYWxEYXRhXzYuc3ByaXRlRnJhbWVBcnJfdm4gfHwgW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVGcmFtZUFycl92biA9IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuIDogdGhpcy5zcHJpdGVGcmFtZUFycl92bjtcclxuXHJcbiAgICAgICAgbGV0IGxhbmd1YWdlID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZExhbmd1YWdlJykgfHwgTGFuZ3VhZ2UuRU47XHJcblxyXG4gICAgICAgIGxldCBsYW5ndWFnZU9iajogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHt9O1xyXG4gICAgICAgIHN3aXRjaCAobGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5aSDpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy56aExhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuVk46XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuaW5MYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLkVOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmVuTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFiZWxBcnIuZm9yRWFjaCgobGFiZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGxhbmd1YWdlT2JqW2luZGV4XSB8fCAnJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=