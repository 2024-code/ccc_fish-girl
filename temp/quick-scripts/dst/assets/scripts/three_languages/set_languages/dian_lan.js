
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/set_languages/dian_lan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '303877C5d1EkYLEakAZjyuI', 'dian_lan');
// scripts/three_languages/set_languages/dian_lan.ts

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
var dian_lan = /** @class */ (function (_super) {
    __extends(dian_lan, _super);
    function dian_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.spriteArr = [];
        _this.spriteFrameArr_zh = [];
        _this.spriteFrameArr_en = [];
        _this.spriteFrameArr_vn = [];
        _this.zhLanguage = {
            0: '点击下注',
            1: '退出',
            2: '点击下注'
        };
        _this.enLanguage = {
            0: 'Click to bet ',
            1: 'Quit ',
            2: 'Click to bet'
        };
        _this.inLanguage = {
            0: 'klik dan bertaruh',
            1: 'keluar ',
            2: 'Klik untuk bertaruh'
        };
        return _this;
    }
    dian_lan.prototype.start = function () {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_4) {
            window.globalData_4 = {};
        }
        window.globalData_4.labelArr = this.labelArr;
        window.globalData_4.spriteArr = this.spriteArr;
        window.globalData_4.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_4.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_4.spriteFrameArr_vn = this.spriteFrameArr_vn;
        this.setLanguage();
    };
    dian_lan.prototype.setLanguage = function () {
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('dian_lan');
        var globalLabelArr = window.globalData_4.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;
        var globalSpriteArr = window.globalData_4.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;
        var globalSpriteFrameArr_zh = window.globalData_4.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;
        var globalSpriteFrameArr_en = window.globalData_4.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;
        var globalSpriteFrameArr_vn = window.globalData_4.spriteFrameArr_vn || [];
        this.spriteFrameArr_vn = globalSpriteFrameArr_vn.length ? globalSpriteFrameArr_vn : this.spriteFrameArr_vn;
        var language = cc.sys.localStorage.getItem('selectedLanguage') || Language.EN;
        var languageObj = {};
        switch (language) {
            case Language.ZH:
                languageObj = this.zhLanguage;
                for (var i = 0; i < this.spriteFrameArr_zh.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_zh[i];
                }
                break;
            case Language.VN:
                languageObj = this.inLanguage;
                for (var i = 0; i < this.spriteFrameArr_vn.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_vn[i];
                }
                break;
            case Language.EN:
                languageObj = this.enLanguage;
                for (var i = 0; i < this.spriteFrameArr_en.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_en[i];
                }
                break;
        }
        this.labelArr.forEach(function (label, index) {
            label.string = languageObj[index] || '';
        });
    };
    __decorate([
        property({ type: [cc.Label], tooltip: '替换的Label' })
    ], dian_lan.prototype, "labelArr", void 0);
    __decorate([
        property({ type: [cc.Sprite], tooltip: '替换的Sprite' })
    ], dian_lan.prototype, "spriteArr", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的中文图片' })
    ], dian_lan.prototype, "spriteFrameArr_zh", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的英文图片' })
    ], dian_lan.prototype, "spriteFrameArr_en", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的印尼图片' })
    ], dian_lan.prototype, "spriteFrameArr_vn", void 0);
    dian_lan = __decorate([
        ccclass
    ], dian_lan);
    return dian_lan;
}(cc.Component));
exports.default = dian_lan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxkaWFuX2xhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFLLFFBSUo7QUFKRCxXQUFLLFFBQVE7SUFDVCx5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7QUFDakIsQ0FBQyxFQUpJLFFBQVEsS0FBUixRQUFRLFFBSVo7QUFXRDtJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQWdHQztRQTdGRyxjQUFRLEdBQWUsRUFBRSxDQUFDO1FBRzFCLGVBQVMsR0FBZ0IsRUFBRSxDQUFDO1FBRzVCLHVCQUFpQixHQUFxQixFQUFFLENBQUM7UUFHekMsdUJBQWlCLEdBQXFCLEVBQUUsQ0FBQztRQUd6Qyx1QkFBaUIsR0FBcUIsRUFBRSxDQUFDO1FBRXpDLGdCQUFVLEdBQThCO1lBQ3BDLENBQUMsRUFBRSxNQUFNO1lBQ1QsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsTUFBTTtTQUNaLENBQUM7UUFFRixnQkFBVSxHQUE4QjtZQUNwQyxDQUFDLEVBQUUsZUFBZTtZQUNsQixDQUFDLEVBQUUsT0FBTztZQUNWLENBQUMsRUFBRSxjQUFjO1NBQ3BCLENBQUM7UUFFRixnQkFBVSxHQUE4QjtZQUNwQyxDQUFDLEVBQUUsbUJBQW1CO1lBQ3RCLENBQUMsRUFBRSxTQUFTO1lBQ1osQ0FBQyxFQUFFLHFCQUFxQjtTQUMzQixDQUFDOztJQStETixDQUFDO0lBN0RhLHdCQUFLLEdBQWY7UUFDSSxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDdEIsTUFBTSxDQUFDLFlBQVksR0FBRyxFQUFrQixDQUFDO1NBQzVDO1FB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NUI7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDO3VEQUNoQjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7dURBQ2hCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQzt1REFDaEI7SUFmeEIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQWdHNUI7SUFBRCxlQUFDO0NBaEdELEFBZ0dDLENBaEdxQyxFQUFFLENBQUMsU0FBUyxHQWdHakQ7a0JBaEdvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgWkggPSAndHh0LnpoJyxcclxuICAgIFZOID0gJ3R4dC52bicsXHJcbiAgICBFTiA9ICd0eHQuZW4nXHJcbn1cclxuXHJcbmludGVyZmFjZSBHbG9iYWxEYXRhXzQge1xyXG4gICAgbGFiZWxBcnI6IGNjLkxhYmVsW10sXHJcbiAgICBzcHJpdGVBcnI6IGNjLlNwcml0ZVtdLFxyXG4gICAgc3ByaXRlRnJhbWVBcnJfemg6IGNjLlNwcml0ZUZyYW1lW10sXHJcbiAgICBzcHJpdGVGcmFtZUFycl9lbjogY2MuU3ByaXRlRnJhbWVbXSxcclxuICAgIHNwcml0ZUZyYW1lQXJyX3ZuOiBjYy5TcHJpdGVGcmFtZVtdXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGRpYW5fbGFuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTGFiZWxdLCB0b29sdGlwOiAn5pu/5o2i55qETGFiZWwnIH0pXHJcbiAgICBsYWJlbEFycjogY2MuTGFiZWxbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVdLCB0b29sdGlwOiAn5pu/5o2i55qEU3ByaXRlJyB9KVxyXG4gICAgc3ByaXRlQXJyOiBjYy5TcHJpdGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoTkuK3mloflm77niYcnIH0pXHJcbiAgICBzcHJpdGVGcmFtZUFycl96aDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoToi7Hmloflm77niYcnIH0pXHJcbiAgICBzcHJpdGVGcmFtZUFycl9lbjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoTljbDlsLzlm77niYcnIH0pXHJcbiAgICBzcHJpdGVGcmFtZUFycl92bjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIHpoTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ+eCueWHu+S4i+azqCcsXHJcbiAgICAgICAgMTogJ+mAgOWHuicsXHJcbiAgICAgICAgMjogJ+eCueWHu+S4i+azqCdcclxuICAgIH07XHJcblxyXG4gICAgZW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAnQ2xpY2sgdG8gYmV0ICcsXHJcbiAgICAgICAgMTogJ1F1aXQgJyxcclxuICAgICAgICAyOiAnQ2xpY2sgdG8gYmV0J1xyXG4gICAgfTtcclxuXHJcbiAgICBpbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICdrbGlrIGRhbiBiZXJ0YXJ1aCcsXHJcbiAgICAgICAgMTogJ2tlbHVhciAnLFxyXG4gICAgICAgIDI6ICdLbGlrIHVudHVrIGJlcnRhcnVoJ1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8g5bCG6ZyA6KaB5L+d55WZ55qE5bGe5oCn6LWL5YC857uZ5YWo5bGA5a+56LGhXHJcbiAgICAgICAgaWYgKCF3aW5kb3cuZ2xvYmFsRGF0YV80KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzQgPSB7fSBhcyBHbG9iYWxEYXRhXzQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzQubGFiZWxBcnIgPSB0aGlzLmxhYmVsQXJyO1xyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzQuc3ByaXRlQXJyID0gdGhpcy5zcHJpdGVBcnI7XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfNC5zcHJpdGVGcmFtZUFycl96aCA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfemg7XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfNC5zcHJpdGVGcmFtZUFycl9lbiA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW47XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfNC5zcHJpdGVGcmFtZUFycl92biA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfdm47XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TGFuZ3VhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldExhbmd1YWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHBlcnNpc3ROb2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnaW5pdF9sYW5ndWFnZScpO1xyXG4gICAgICAgIGNvbnN0IHlvdXJTY3JpcHRDb21wb25lbnQgPSBwZXJzaXN0Tm9kZS5nZXRDb21wb25lbnQoJ2RpYW5fbGFuJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbExhYmVsQXJyID0gd2luZG93Lmdsb2JhbERhdGFfNC5sYWJlbEFyciB8fCBbXTtcclxuICAgICAgICB0aGlzLmxhYmVsQXJyID0gZ2xvYmFsTGFiZWxBcnIubGVuZ3RoID8gZ2xvYmFsTGFiZWxBcnIgOiB0aGlzLmxhYmVsQXJyO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVBcnIgPSB3aW5kb3cuZ2xvYmFsRGF0YV80LnNwcml0ZUFyciB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUFyciA9IGdsb2JhbFNwcml0ZUFyci5sZW5ndGggPyBnbG9iYWxTcHJpdGVBcnIgOiB0aGlzLnNwcml0ZUFycjtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsU3ByaXRlRnJhbWVBcnJfemggPSB3aW5kb3cuZ2xvYmFsRGF0YV80LnNwcml0ZUZyYW1lQXJyX3poIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVBcnJfemggPSBnbG9iYWxTcHJpdGVGcmFtZUFycl96aC5sZW5ndGggPyBnbG9iYWxTcHJpdGVGcmFtZUFycl96aCA6IHRoaXMuc3ByaXRlRnJhbWVBcnJfemg7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbFNwcml0ZUZyYW1lQXJyX2VuID0gd2luZG93Lmdsb2JhbERhdGFfNC5zcHJpdGVGcmFtZUFycl9lbiB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuID0gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4ubGVuZ3RoID8gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4gOiB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVGcmFtZUFycl92biA9IHdpbmRvdy5nbG9iYWxEYXRhXzQuc3ByaXRlRnJhbWVBcnJfdm4gfHwgW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVGcmFtZUFycl92biA9IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuIDogdGhpcy5zcHJpdGVGcmFtZUFycl92bjtcclxuXHJcbiAgICAgICAgbGV0IGxhbmd1YWdlID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZExhbmd1YWdlJykgfHwgTGFuZ3VhZ2UuRU47XHJcblxyXG4gICAgICAgIGxldCBsYW5ndWFnZU9iajogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHt9O1xyXG4gICAgICAgIHN3aXRjaCAobGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5aSDpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy56aExhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNwcml0ZUZyYW1lQXJyX3poLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVBcnJbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUZyYW1lQXJyX3poW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuVk46XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuaW5MYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zcHJpdGVGcmFtZUFycl92bi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlQXJyW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVGcmFtZUFycl92bltpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLkVOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmVuTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUFycltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW5baV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFiZWxBcnIuZm9yRWFjaCgobGFiZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGxhbmd1YWdlT2JqW2luZGV4XSB8fCAnJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=