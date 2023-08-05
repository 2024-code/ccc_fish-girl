
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/set_languages/baijiale_game_lan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c7a59wUfsFICK8VlVxCUcAE', 'baijiale_game_lan');
// scripts/three_languages/set_languages/baijiale_game_lan.ts

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
var BaijialeGameLan = /** @class */ (function (_super) {
    __extends(BaijialeGameLan, _super);
    function BaijialeGameLan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.spriteArr = [];
        _this.spriteFrameArr_zh = [];
        _this.spriteFrameArr_en = [];
        _this.spriteFrameArr_vn = [];
        _this.zhLanguage = {
            0: '点',
            1: '点',
            2: '富豪',
            3: '神算子',
            4: '规则',
            5: '请下住'
        };
        _this.enLanguage = {
            0: 'POINT',
            1: 'POINT',
            2: 'RICH',
            3: 'GodOperator',
            4: 'RULE',
            5: ' Please stay down '
        };
        _this.inLanguage = {
            0: 'titik ',
            1: 'titik ',
            2: 'kaya ',
            3: 'GodOperator',
            4: 'aturan ',
            5: 'tolong jangan bangun'
        };
        return _this;
    }
    BaijialeGameLan.prototype.start = function () {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_2) {
            window.globalData_2 = {};
        }
        window.globalData_2.labelArr = this.labelArr;
        window.globalData_2.spriteArr = this.spriteArr;
        window.globalData_2.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_2.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_2.spriteFrameArr_vn = this.spriteFrameArr_vn;
        this.setLanguage();
    };
    BaijialeGameLan.prototype.setLanguage = function () {
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('BaijialeGameLan');
        var globalLabelArr = window.globalData_2.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;
        var globalSpriteArr = window.globalData_2.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;
        var globalSpriteFrameArr_zh = window.globalData_2.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;
        var globalSpriteFrameArr_en = window.globalData_2.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;
        var globalSpriteFrameArr_vn = window.globalData_2.spriteFrameArr_vn || [];
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
    ], BaijialeGameLan.prototype, "labelArr", void 0);
    __decorate([
        property({ type: [cc.Sprite], tooltip: '替换的Sprite' })
    ], BaijialeGameLan.prototype, "spriteArr", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的中文图片' })
    ], BaijialeGameLan.prototype, "spriteFrameArr_zh", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的英文图片' })
    ], BaijialeGameLan.prototype, "spriteFrameArr_en", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的印尼图片' })
    ], BaijialeGameLan.prototype, "spriteFrameArr_vn", void 0);
    BaijialeGameLan = __decorate([
        ccclass
    ], BaijialeGameLan);
    return BaijialeGameLan;
}(cc.Component));
exports.default = BaijialeGameLan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxiYWlqaWFsZV9nYW1lX2xhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFLLFFBSUo7QUFKRCxXQUFLLFFBQVE7SUFDVCx5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7QUFDakIsQ0FBQyxFQUpJLFFBQVEsS0FBUixRQUFRLFFBSVo7QUFXRDtJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQXlHQztRQXRHRyxjQUFRLEdBQWUsRUFBRSxDQUFDO1FBRTFCLGVBQVMsR0FBZ0IsRUFBRSxDQUFDO1FBRzVCLHVCQUFpQixHQUFxQixFQUFFLENBQUM7UUFHekMsdUJBQWlCLEdBQXFCLEVBQUUsQ0FBQztRQUd6Qyx1QkFBaUIsR0FBcUIsRUFBRSxDQUFDO1FBR3pDLGdCQUFVLEdBQThCO1lBQ3BDLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxLQUFLO1lBQ1IsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsS0FBSztTQUNYLENBQUM7UUFFRixnQkFBVSxHQUE4QjtZQUNwQyxDQUFDLEVBQUUsT0FBTztZQUNWLENBQUMsRUFBRSxPQUFPO1lBQ1YsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsYUFBYTtZQUNoQixDQUFDLEVBQUUsTUFBTTtZQUNULENBQUMsRUFBRSxvQkFBb0I7U0FDMUIsQ0FBQztRQUVGLGdCQUFVLEdBQThCO1lBQ3BDLENBQUMsRUFBRSxRQUFRO1lBQ1gsQ0FBQyxFQUFFLFFBQVE7WUFDWCxDQUFDLEVBQUUsT0FBTztZQUNWLENB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REMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztxREFDMUI7SUFFMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDO3NEQUMxQjtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7OERBQ2hCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQzs4REFDaEI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDOzhEQUNoQjtJQWR4QixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBeUduQztJQUFELHNCQUFDO0NBekdELEFBeUdDLENBekc0QyxFQUFFLENBQUMsU0FBUyxHQXlHeEQ7a0JBekdvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgWkggPSAndHh0LnpoJyxcclxuICAgIFZOID0gJ3R4dC52bicsXHJcbiAgICBFTiA9ICd0eHQuZW4nXHJcbn1cclxuXHJcbmludGVyZmFjZSBHbG9iYWxEYXRhXzIge1xyXG4gICAgbGFiZWxBcnI6IGNjLkxhYmVsW10sXHJcbiAgICBzcHJpdGVBcnI6IGNjLlNwcml0ZVtdLFxyXG4gICAgc3ByaXRlRnJhbWVBcnJfemg6IGNjLlNwcml0ZUZyYW1lW10sXHJcbiAgICBzcHJpdGVGcmFtZUFycl9lbjogY2MuU3ByaXRlRnJhbWVbXSxcclxuICAgIHNwcml0ZUZyYW1lQXJyX3ZuOiBjYy5TcHJpdGVGcmFtZVtdXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhaWppYWxlR2FtZUxhbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLkxhYmVsXSwgdG9vbHRpcDogJ+abv+aNoueahExhYmVsJyB9KVxyXG4gICAgbGFiZWxBcnI6IGNjLkxhYmVsW10gPSBbXTtcclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVdLCB0b29sdGlwOiAn5pu/5o2i55qEU3ByaXRlJyB9KVxyXG4gICAgc3ByaXRlQXJyOiBjYy5TcHJpdGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoTkuK3mloflm77niYcnIH0pXHJcbiAgICBzcHJpdGVGcmFtZUFycl96aDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoToi7Hmloflm77niYcnIH0pXHJcbiAgICBzcHJpdGVGcmFtZUFycl9lbjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoTljbDlsLzlm77niYcnIH0pXHJcbiAgICBzcHJpdGVGcmFtZUFycl92bjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuXHJcbiAgICB6aExhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICfngrknLFxyXG4gICAgICAgIDE6ICfngrknLFxyXG4gICAgICAgIDI6ICflr4zosaonLFxyXG4gICAgICAgIDM6ICfnpZ7nrpflrZAnLFxyXG4gICAgICAgIDQ6ICfop4TliJknLFxyXG4gICAgICAgIDU6ICfor7fkuIvkvY8nXHJcbiAgICB9O1xyXG5cclxuICAgIGVuTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ1BPSU5UJyxcclxuICAgICAgICAxOiAnUE9JTlQnLFxyXG4gICAgICAgIDI6ICdSSUNIJyxcclxuICAgICAgICAzOiAnR29kT3BlcmF0b3InLFxyXG4gICAgICAgIDQ6ICdSVUxFJyxcclxuICAgICAgICA1OiAnIFBsZWFzZSBzdGF5IGRvd24gJ1xyXG4gICAgfTtcclxuXHJcbiAgICBpbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICd0aXRpayAnLFxyXG4gICAgICAgIDE6ICd0aXRpayAnLFxyXG4gICAgICAgIDI6ICdrYXlhICcsXHJcbiAgICAgICAgMzogJ0dvZE9wZXJhdG9yJyxcclxuICAgICAgICA0OiAnYXR1cmFuICcsXHJcbiAgICAgICAgNTogJ3RvbG9uZyBqYW5nYW4gYmFuZ3VuJ1xyXG4gICAgfTtcclxuXHJcbiAgIFxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIOWwhumcgOimgeS/neeVmeeahOWxnuaAp+i1i+WAvOe7meWFqOWxgOWvueixoVxyXG4gICAgICAgIGlmICghd2luZG93Lmdsb2JhbERhdGFfMikge1xyXG4gICAgICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV8yID0ge30gYXMgR2xvYmFsRGF0YV8yO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV8yLmxhYmVsQXJyID0gdGhpcy5sYWJlbEFycjtcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV8yLnNwcml0ZUFyciA9IHRoaXMuc3ByaXRlQXJyO1xyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzIuc3ByaXRlRnJhbWVBcnJfemggPSB0aGlzLnNwcml0ZUZyYW1lQXJyX3poO1xyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzIuc3ByaXRlRnJhbWVBcnJfZW4gPSB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuO1xyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzIuc3ByaXRlRnJhbWVBcnJfdm4gPSB0aGlzLnNwcml0ZUZyYW1lQXJyX3ZuO1xyXG5cclxuICAgICAgICB0aGlzLnNldExhbmd1YWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRMYW5ndWFnZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwZXJzaXN0Tm9kZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ2luaXRfbGFuZ3VhZ2UnKTtcclxuICAgICAgICBjb25zdCB5b3VyU2NyaXB0Q29tcG9uZW50ID0gcGVyc2lzdE5vZGUuZ2V0Q29tcG9uZW50KCdCYWlqaWFsZUdhbWVMYW4nKTtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsTGFiZWxBcnIgPSB3aW5kb3cuZ2xvYmFsRGF0YV8yLmxhYmVsQXJyIHx8IFtdO1xyXG4gICAgICAgIHRoaXMubGFiZWxBcnIgPSBnbG9iYWxMYWJlbEFyci5sZW5ndGggPyBnbG9iYWxMYWJlbEFyciA6IHRoaXMubGFiZWxBcnI7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbFNwcml0ZUFyciA9IHdpbmRvdy5nbG9iYWxEYXRhXzIuc3ByaXRlQXJyIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQXJyID0gZ2xvYmFsU3ByaXRlQXJyLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUFyciA6IHRoaXMuc3ByaXRlQXJyO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVGcmFtZUFycl96aCA9IHdpbmRvdy5nbG9iYWxEYXRhXzIuc3ByaXRlRnJhbWVBcnJfemggfHwgW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVGcmFtZUFycl96aCA9IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3poLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3poIDogdGhpcy5zcHJpdGVGcmFtZUFycl96aDtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4gPSB3aW5kb3cuZ2xvYmFsRGF0YV8yLnNwcml0ZUZyYW1lQXJyX2VuIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVBcnJfZW4gPSBnbG9iYWxTcHJpdGVGcmFtZUFycl9lbi5sZW5ndGggPyBnbG9iYWxTcHJpdGVGcmFtZUFycl9lbiA6IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW47XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuID0gd2luZG93Lmdsb2JhbERhdGFfMi5zcHJpdGVGcmFtZUFycl92biB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUZyYW1lQXJyX3ZuID0gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfdm4ubGVuZ3RoID8gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfdm4gOiB0aGlzLnNwcml0ZUZyYW1lQXJyX3ZuO1xyXG4gICAgICAgIGxldCBsYW5ndWFnZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0ZWRMYW5ndWFnZScpIHx8IExhbmd1YWdlLkVOO1xyXG5cclxuICAgICAgICBsZXQgbGFuZ3VhZ2VPYmo6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7fTtcclxuICAgICAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuWkg6XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuemhMYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zcHJpdGVGcmFtZUFycl96aC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlQXJyW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVGcmFtZUFycl96aFtpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLlZOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmluTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3ByaXRlRnJhbWVBcnJfdm4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUFycltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfdm5baV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5FTjpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy5lbkxhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVBcnJbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxhYmVsQXJyLmZvckVhY2goKGxhYmVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBsYW5ndWFnZU9ialtpbmRleF0gfHwgJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=