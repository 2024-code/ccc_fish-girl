
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/set_languages/yadaxiao_game_lan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '00ccfsIB4dN3ZpJBl2r4+jp', 'yadaxiao_game_lan');
// scripts/three_languages/set_languages/yadaxiao_game_lan.ts

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
var yadaxiao_game_lan = /** @class */ (function (_super) {
    __extends(yadaxiao_game_lan, _super);
    function yadaxiao_game_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.zhLanguage = {
            0: '请先先择一次大小',
            1: '上限：',
            2: '压大：',
            3: '上限：',
            4: '压小：',
            5: '等待中。。。',
            6: '抢庄数值',
            7: '在线人数:0',
            8: '下注人数:0',
            9: '请先先择一次大小',
            10: '本局您的上庄金币',
            11: '您本局的上装分数是',
            12: '本局您的金币',
            13: '本局您共下注大',
            14: '本局您共下注小',
            15: '本局结果  ?',
            16: '账号',
            17: '金币',
            18: '请填写金币数',
            19: '开始抢庄',
            20: '快压范围：1-1000',
            21: '抢庄范围：10万-30万',
            22: '富豪榜',
            23: '停止下注',
            24: '开始下注'
        };
        _this.enLanguage = {
            0: 'Please select a size first ',
            1: 'Upper limit: ',
            2: 'Press big: ',
            3: 'Upper limit: ',
            4: 'Press small: ',
            5: 'Waiting... ',
            6: 'snatch value ',
            7: 'Number of people online :0',
            8: 'Number of bets :0',
            9: 'Please choose a size first ',
            10: 'This is your gold coin ',
            11: 'Your top score in this bureau is ',
            12: 'This bureau your gold coin ',
            13: 'You bet big in this game ',
            14: 'This board you total bet small ',
            15: 'This bureau result? ',
            16: 'Account number ',
            17: 'Gold coin ',
            18: 'Please fill in the number of gold coins ',
            19: 'Start robbing ',
            20: 'Fast pressure range: 1-1000',
            21: 'Robbery range: 100,000-300,000 ',
            22: 'Rich List ',
            23: 'Stop betting ',
            24: 'Start betting'
        };
        _this.inLanguage = {
            0: 'silakan pilih ukuran pertama ',
            1: 'batas atas: ',
            2: 'tekan besar: ',
            3: 'batas atas: ',
            4: 'tekan kecil: ',
            5: 'menunggu … ',
            6: 'rebut nilai ',
            7: 'jumlah orang online :0',
            8: 'jumlah taruhan :0',
            9: 'pilihlah ukuran yang pertama ',
            10: 'ini adalah uang logam emasmu ',
            11: 'skor utama anda di biro ini adalah ',
            12: 'biro ini koin emasmu ',
            13: 'anda bertaruh besar dalam permainan ini ',
            14: 'papan ini taruhannya kecil ',
            15: 'hasil dari biro ini? ',
            16: 'nomor rekening ',
            17: 'koin emas ',
            18: 'silakan isi jumlah koin emas ',
            19: 'mulai merampok ',
            20: 'kisaran tekanan cepat: 1-1000',
            21: 'kisaran perampokan: 100.000 — 300.000 ',
            22: 'daftar kaya ',
            23: 'Stop betting ',
            24: 'mulai bertaruh'
        };
        return _this;
    }
    yadaxiao_game_lan.prototype.start = function () {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_8) {
            window.globalData_8 = {};
        }
        window.globalData_8.labelArr = this.labelArr;
        window.globalData_8.spriteArr = this.spriteArr;
        window.globalData_8.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_8.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_8.spriteFrameArr_vn = this.spriteFrameArr_vn;
        this.setLanguage();
    };
    yadaxiao_game_lan.prototype.setLanguage = function () {
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('yadaxiao_game_lan');
        var globalLabelArr = window.globalData_8.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;
        var globalSpriteArr = window.globalData_8.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;
        var globalSpriteFrameArr_zh = window.globalData_8.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;
        var globalSpriteFrameArr_en = window.globalData_8.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;
        var globalSpriteFrameArr_vn = window.globalData_8.spriteFrameArr_vn || [];
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
    ], yadaxiao_game_lan.prototype, "labelArr", void 0);
    yadaxiao_game_lan = __decorate([
        ccclass
    ], yadaxiao_game_lan);
    return yadaxiao_game_lan;
}(cc.Component));
exports.default = yadaxiao_game_lan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFx5YWRheGlhb19nYW1lX2xhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFLLFFBSUo7QUFKRCxXQUFLLFFBQVE7SUFDVCx5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7QUFDakIsQ0FBQyxFQUpJLFFBQVEsS0FBUixRQUFRLFFBSVo7QUFXRDtJQUErQyxxQ0FBWTtJQUEzRDtRQUFBLHFFQTZJQztRQTFJRyxjQUFRLEdBQWUsRUFBRSxDQUFDO1FBRTFCLGdCQUFVLEdBQThCO1lBQ3BDLENBQUMsRUFBRSxVQUFVO1lBQ2IsQ0FBQyxFQUFFLEtBQUs7WUFDUixDQUFDLEVBQUUsS0FBSztZQUNSLENBQUMsRUFBRSxLQUFLO1lBQ1IsQ0FBQyxFQUFFLEtBQUs7WUFDUixDQUFDLEVBQUUsUUFBUTtZQUNYLENBQUMsRUFBRSxNQUFNO1lBQ1QsQ0FBQyxFQUFFLFFBQVE7WUFDWCxDQUFDLEVBQUUsUUFBUTtZQUNYLENBQUMsRUFBRSxVQUFVO1lBQ2IsRUFBRSxFQUFFLFVBQVU7WUFDZCxFQUFFLEVBQUUsV0FBVztZQUNmLEVBQUUsRUFBRSxRQUFRO1lBQ1osRUFBRSxFQUFFLFNBQVM7WUFDYixFQUFFLEVBQUUsU0FBUztZQUNiLEVBQUUsRUFBRSxTQUFTO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixFQUFFLEVBQUUsSUFBSTtZQUNSLEVBQUUsRUFBRSxRQUFRO1lBQ1osRUFBRSxFQUFFLE1BQU07WUFDVixFQUFFLEVBQUUsYUFBYTtZQUNqQixFQUFFLEVBQUUsY0FBYztZQUNsQixFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxNQUFNO1lBQ1YsRUFBRSxFQUFFLE1BQU07U0FDYixDQUFDO1FBRUYsZ0JBQVUsR0FBOEI7WUFDcEMsQ0FBQyxFQUFFLDZCQUE2QjtZQUNoQyxDQUFDLEVBQUUsZUFBZTtZQUNsQixDQUFDLEVBQUUsYUFBYTtZQUNoQixDQUFDLEVBQUUsZUFBZTtZQUNsQixDQUFDLEVBQUUsZUFBZTtZQUNsQixDQUFDLEVBQUUsYUFBYTtZQUNoQixDQUFDLEVBQUUsZUFBZTtZQUNsQixDQUFDLEVBQUUsNEJBQTRCO1lBQy9CLENBQUMsRUFBRSxtQkFBbUI7WUFDdEIsQ0FBQyxFQUFFLDZCQUE2QjtZQUNoQyxFQUFFLEVBQUUseUJBQXlCO1lBQzdCLEVBQUUsRUFBRSxtQ0FBbUM7WUFDdkMsRUFBRSxFQUFFLDZCQUE2QjtZQUNqQyxFQUFFLEVBQUUsMkJBQTJCO1lBQy9CLEVBQUUsRUFBRSxpQ0FBaUM7WUFDckMsRUFBRSxFQUFFLHNCQUFzQjtZQUMxQixFQUFFLEVBQUUsaUJBQWlCO1lBQ3JCLEVBQUUsRUFBRSxZQUFZO1lBQ2hCLEVBQUUsRUFBRSwwQ0FBMEM7WUFDOUMsRUFBRSxFQUFFLGdCQUFnQjtZQUNwQixFQUFFLEVBQUUsNkJBQTZCO1lBQ2pDLEVBQUUsRUFBRSxpQ0FBaUM7WUFDckMsRUFBRSxFQUFFLFlBQVk7WUFDaEIsRUFBRSxFQUFFLGVBQWU7WUFDbkIsRUFBRSxFQUFFLGVBQWU7U0FDdEIsQ0FBQztRQUVGLGdCQUFVLEdBQThCO1lBQ3BDLENBQUMsRUFBRSwrQkFBK0I7WUFDbEMsQ0FBQyxFQUFFLGNBQWM7WUFDakIsQ0FBQyxFQUFFLGVBQWU7WUFDbEIsQ0FBQyxFQUFFLGNBQWM7WUFDakIsQ0FBQyxFQUFFLGVBQWU7WUFDbEIsQ0FBQyxFQUFFLGFBQWE7WUFDaEIsQ0FBQyxFQUFFLGNBQWM7WUFDakIsQ0FBQyxFQUFFLHdCQUF3QjtZQUMzQixDQUFDLEVBQUUsbUJBQW1CO1lBQ3RCLENBQUMsRUFBRSwrQkFBK0I7WUFDbEMsRUFBRSxFQUFFLCtCQUErQjtZQUNuQyxFQUFFLEVBQUUscUNBQXFDO1lBQ3pDLEVBQUUsRUFBRSx1QkFBdUI7WUFDM0IsRUFBRSxFQUFFLDBDQUEwQztZQUM5QyxFQUFFLEVBQUUsNkJBQTZCO1lBQ2pDLEVBQUUsRUFBRSx1QkFBdUI7WUFDM0IsRUFBRSxFQUFFLGlCQUFpQjtZQUNyQixFQUFFLEVBQUUsWUFBWTtZQUNoQixFQUFFLEVBQUUsK0JBQStCO1lBQ25DLEVBQUUsRUFBRSxpQkFBaUI7WUFDckIsRUFBRSxFQUFFLCtCQUErQjtZQUNuQyxFQUFFLEVBQUUsd0NBQXdDO1lBQzVDLEVBQUUsRUFBRSxjQUFjO1lBQ2xCLEVBQUUsRUFBRSxlQUFlO1lBQ25CLEVBQUUsRUFBRSxnQkFBZ0I7U0FDdkIsQ0FBQzs7SUFzRE4sQ0FBQztJQXBEYSxpQ0FBSyxHQUFmO1FBQ0ksa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsRUFBa0IsQ0FBQztTQUM1QztRQUNELE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMvQyxNQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUMvRCxNQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUMvRCxNQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUUvRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVPLHVDQUFXLEdBQW5CO1FBQ0ksSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0UsSUFBTSxtQkFBbUIsR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFMUUsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXZFLElBQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUM1RCxJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUUzRSxJQUFNLHVCQUF1QixHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDO1FBQzVFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFFM0csSUFBTSx1QkFBdUIsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztRQUM1RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBRTNHLElBQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUM7UUFDNUUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUUzRyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDO1FBRTlFLElBQUksV0FBVyxHQUE4QixFQUFFLENBQUM7UUFDaEQsUUFBUSxRQUFRLEVBQUU7WUFDZCxLQUFLLFFBQVEsQ0FBQyxFQUFFO2dCQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUM5QixNQUFNO1lBQ1YsS0FBSyxRQUFRLENBQUMsRUFBRTtnQkFDWixXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDOUIsTUFBTTtZQUNWLEtBQUssUUFBUSxDQUFDLEVBQUU7Z0JBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQzlCLE1BQU07U0FDYjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUs7WUFDL0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXpJRDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUM7dURBQzFCO0lBSFQsaUJBQWlCO1FBRHJDLE9BQU87T0FDYSxpQkFBaUIsQ0E2SXJDO0lBQUQsd0JBQUM7Q0E3SUQsQUE2SUMsQ0E3SThDLEVBQUUsQ0FBQyxTQUFTLEdBNkkxRDtrQkE3SW9CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIExhbmd1YWdlIHtcclxuICAgIFpIID0gJ3R4dC56aCcsXHJcbiAgICBWTiA9ICd0eHQudm4nLFxyXG4gICAgRU4gPSAndHh0LmVuJ1xyXG59XHJcblxyXG5pbnRlcmZhY2UgR2xvYmFsRGF0YV84IHtcclxuICAgIGxhYmVsQXJyOiBjYy5MYWJlbFtdLFxyXG4gICAgc3ByaXRlQXJyOiBjYy5TcHJpdGVbXSxcclxuICAgIHNwcml0ZUZyYW1lQXJyX3poOiBjYy5TcHJpdGVGcmFtZVtdLFxyXG4gICAgc3ByaXRlRnJhbWVBcnJfZW46IGNjLlNwcml0ZUZyYW1lW10sXHJcbiAgICBzcHJpdGVGcmFtZUFycl92bjogY2MuU3ByaXRlRnJhbWVbXVxyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB5YWRheGlhb19nYW1lX2xhbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLkxhYmVsXSwgdG9vbHRpcDogJ+abv+aNoueahExhYmVsJyB9KVxyXG4gICAgbGFiZWxBcnI6IGNjLkxhYmVsW10gPSBbXTtcclxuXHJcbiAgICB6aExhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICfor7flhYjlhYjmi6nkuIDmrKHlpKflsI8nLFxyXG4gICAgICAgIDE6ICfkuIrpmZDvvJonLFxyXG4gICAgICAgIDI6ICfljovlpKfvvJonLCAgICBcclxuICAgICAgICAzOiAn5LiK6ZmQ77yaJyxcclxuICAgICAgICA0OiAn5Y6L5bCP77yaJyxcclxuICAgICAgICA1OiAn562J5b6F5Lit44CC44CC44CCJyxcclxuICAgICAgICA2OiAn5oqi5bqE5pWw5YC8JyxcclxuICAgICAgICA3OiAn5Zyo57q/5Lq65pWwOjAnLFxyXG4gICAgICAgIDg6ICfkuIvms6jkurrmlbA6MCcsXHJcbiAgICAgICAgOTogJ+ivt+WFiOWFiOaLqeS4gOasoeWkp+WwjycsXHJcbiAgICAgICAgMTA6ICfmnKzlsYDmgqjnmoTkuIrluoTph5HluIEnLFxyXG4gICAgICAgIDExOiAn5oKo5pys5bGA55qE5LiK6KOF5YiG5pWw5pivJyxcclxuICAgICAgICAxMjogJ+acrOWxgOaCqOeahOmHkeW4gScsXHJcbiAgICAgICAgMTM6ICfmnKzlsYDmgqjlhbHkuIvms6jlpKcnLFxyXG4gICAgICAgIDE0OiAn5pys5bGA5oKo5YWx5LiL5rOo5bCPJyxcclxuICAgICAgICAxNTogJ+acrOWxgOe7k+aenCAgPycsXHJcbiAgICAgICAgMTY6ICfotKblj7cnLFxyXG4gICAgICAgIDE3OiAn6YeR5biBJyxcclxuICAgICAgICAxODogJ+ivt+Whq+WGmemHkeW4geaVsCcsXHJcbiAgICAgICAgMTk6ICflvIDlp4vmiqLluoQnLFxyXG4gICAgICAgIDIwOiAn5b+r5Y6L6IyD5Zu077yaMS0xMDAwJyxcclxuICAgICAgICAyMTogJ+aKouW6hOiMg+WbtO+8mjEw5LiHLTMw5LiHJyxcclxuICAgICAgICAyMjogJ+WvjOixquamnCcsXHJcbiAgICAgICAgMjM6ICflgZzmraLkuIvms6gnLFxyXG4gICAgICAgIDI0OiAn5byA5aeL5LiL5rOoJ1xyXG4gICAgfTtcclxuXHJcbiAgICBlbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICdQbGVhc2Ugc2VsZWN0IGEgc2l6ZSBmaXJzdCAnLFxyXG4gICAgICAgIDE6ICdVcHBlciBsaW1pdDogJyxcclxuICAgICAgICAyOiAnUHJlc3MgYmlnOiAnLFxyXG4gICAgICAgIDM6ICdVcHBlciBsaW1pdDogJyxcclxuICAgICAgICA0OiAnUHJlc3Mgc21hbGw6ICcsXHJcbiAgICAgICAgNTogJ1dhaXRpbmcuLi4gJyxcclxuICAgICAgICA2OiAnc25hdGNoIHZhbHVlICcsXHJcbiAgICAgICAgNzogJ051bWJlciBvZiBwZW9wbGUgb25saW5lIDowJyxcclxuICAgICAgICA4OiAnTnVtYmVyIG9mIGJldHMgOjAnLFxyXG4gICAgICAgIDk6ICdQbGVhc2UgY2hvb3NlIGEgc2l6ZSBmaXJzdCAnLFxyXG4gICAgICAgIDEwOiAnVGhpcyBpcyB5b3VyIGdvbGQgY29pbiAnLFxyXG4gICAgICAgIDExOiAnWW91ciB0b3Agc2NvcmUgaW4gdGhpcyBidXJlYXUgaXMgJyxcclxuICAgICAgICAxMjogJ1RoaXMgYnVyZWF1IHlvdXIgZ29sZCBjb2luICcsXHJcbiAgICAgICAgMTM6ICdZb3UgYmV0IGJpZyBpbiB0aGlzIGdhbWUgJyxcclxuICAgICAgICAxNDogJ1RoaXMgYm9hcmQgeW91IHRvdGFsIGJldCBzbWFsbCAnLFxyXG4gICAgICAgIDE1OiAnVGhpcyBidXJlYXUgcmVzdWx0PyAnLFxyXG4gICAgICAgIDE2OiAnQWNjb3VudCBudW1iZXIgJyxcclxuICAgICAgICAxNzogJ0dvbGQgY29pbiAnLFxyXG4gICAgICAgIDE4OiAnUGxlYXNlIGZpbGwgaW4gdGhlIG51bWJlciBvZiBnb2xkIGNvaW5zICcsXHJcbiAgICAgICAgMTk6ICdTdGFydCByb2JiaW5nICcsXHJcbiAgICAgICAgMjA6ICdGYXN0IHByZXNzdXJlIHJhbmdlOiAxLTEwMDAnLFxyXG4gICAgICAgIDIxOiAnUm9iYmVyeSByYW5nZTogMTAwLDAwMC0zMDAsMDAwICcsXHJcbiAgICAgICAgMjI6ICdSaWNoIExpc3QgJyxcclxuICAgICAgICAyMzogJ1N0b3AgYmV0dGluZyAnLFxyXG4gICAgICAgIDI0OiAnU3RhcnQgYmV0dGluZydcclxuICAgIH07XHJcblxyXG4gICAgaW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAnc2lsYWthbiBwaWxpaCB1a3VyYW4gcGVydGFtYSAnLFxyXG4gICAgICAgIDE6ICdiYXRhcyBhdGFzOiAnLFxyXG4gICAgICAgIDI6ICd0ZWthbiBiZXNhcjogJyxcclxuICAgICAgICAzOiAnYmF0YXMgYXRhczogJyxcclxuICAgICAgICA0OiAndGVrYW4ga2VjaWw6ICcsXHJcbiAgICAgICAgNTogJ21lbnVuZ2d1IOKApiAnLFxyXG4gICAgICAgIDY6ICdyZWJ1dCBuaWxhaSAnLFxyXG4gICAgICAgIDc6ICdqdW1sYWggb3Jhbmcgb25saW5lIDowJyxcclxuICAgICAgICA4OiAnanVtbGFoIHRhcnVoYW4gOjAnLFxyXG4gICAgICAgIDk6ICdwaWxpaGxhaCB1a3VyYW4geWFuZyBwZXJ0YW1hICcsXHJcbiAgICAgICAgMTA6ICdpbmkgYWRhbGFoIHVhbmcgbG9nYW0gZW1hc211ICcsXHJcbiAgICAgICAgMTE6ICdza29yIHV0YW1hIGFuZGEgZGkgYmlybyBpbmkgYWRhbGFoICcsXHJcbiAgICAgICAgMTI6ICdiaXJvIGluaSBrb2luIGVtYXNtdSAnLFxyXG4gICAgICAgIDEzOiAnYW5kYSBiZXJ0YXJ1aCBiZXNhciBkYWxhbSBwZXJtYWluYW4gaW5pICcsXHJcbiAgICAgICAgMTQ6ICdwYXBhbiBpbmkgdGFydWhhbm55YSBrZWNpbCAnLFxyXG4gICAgICAgIDE1OiAnaGFzaWwgZGFyaSBiaXJvIGluaT8gJyxcclxuICAgICAgICAxNjogJ25vbW9yIHJla2VuaW5nICcsXHJcbiAgICAgICAgMTc6ICdrb2luIGVtYXMgJyxcclxuICAgICAgICAxODogJ3NpbGFrYW4gaXNpIGp1bWxhaCBrb2luIGVtYXMgJyxcclxuICAgICAgICAxOTogJ211bGFpIG1lcmFtcG9rICcsXHJcbiAgICAgICAgMjA6ICdraXNhcmFuIHRla2FuYW4gY2VwYXQ6IDEtMTAwMCcsXHJcbiAgICAgICAgMjE6ICdraXNhcmFuIHBlcmFtcG9rYW46IDEwMC4wMDAg4oCUIDMwMC4wMDAgJyxcclxuICAgICAgICAyMjogJ2RhZnRhciBrYXlhICcsXHJcbiAgICAgICAgMjM6ICdTdG9wIGJldHRpbmcgJyxcclxuICAgICAgICAyNDogJ211bGFpIGJlcnRhcnVoJ1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8g5bCG6ZyA6KaB5L+d55WZ55qE5bGe5oCn6LWL5YC857uZ5YWo5bGA5a+56LGhXHJcbiAgICAgICAgaWYgKCF3aW5kb3cuZ2xvYmFsRGF0YV84KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzggPSB7fSBhcyBHbG9iYWxEYXRhXzg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzgubGFiZWxBcnIgPSB0aGlzLmxhYmVsQXJyO1xyXG4gICAgICAgIHdpbmRvdy5nbG9iYWxEYXRhXzguc3ByaXRlQXJyID0gdGhpcy5zcHJpdGVBcnI7XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfOC5zcHJpdGVGcmFtZUFycl96aCA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfemg7XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfOC5zcHJpdGVGcmFtZUFycl9lbiA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW47XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfOC5zcHJpdGVGcmFtZUFycl92biA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfdm47XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TGFuZ3VhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldExhbmd1YWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHBlcnNpc3ROb2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnaW5pdF9sYW5ndWFnZScpO1xyXG4gICAgICAgIGNvbnN0IHlvdXJTY3JpcHRDb21wb25lbnQgPSBwZXJzaXN0Tm9kZS5nZXRDb21wb25lbnQoJ3lhZGF4aWFvX2dhbWVfbGFuJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbExhYmVsQXJyID0gd2luZG93Lmdsb2JhbERhdGFfOC5sYWJlbEFyciB8fCBbXTtcclxuICAgICAgICB0aGlzLmxhYmVsQXJyID0gZ2xvYmFsTGFiZWxBcnIubGVuZ3RoID8gZ2xvYmFsTGFiZWxBcnIgOiB0aGlzLmxhYmVsQXJyO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVBcnIgPSB3aW5kb3cuZ2xvYmFsRGF0YV84LnNwcml0ZUFyciB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUFyciA9IGdsb2JhbFNwcml0ZUFyci5sZW5ndGggPyBnbG9iYWxTcHJpdGVBcnIgOiB0aGlzLnNwcml0ZUFycjtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsU3ByaXRlRnJhbWVBcnJfemggPSB3aW5kb3cuZ2xvYmFsRGF0YV84LnNwcml0ZUZyYW1lQXJyX3poIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVBcnJfemggPSBnbG9iYWxTcHJpdGVGcmFtZUFycl96aC5sZW5ndGggPyBnbG9iYWxTcHJpdGVGcmFtZUFycl96aCA6IHRoaXMuc3ByaXRlRnJhbWVBcnJfemg7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbFNwcml0ZUZyYW1lQXJyX2VuID0gd2luZG93Lmdsb2JhbERhdGFfOC5zcHJpdGVGcmFtZUFycl9lbiB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuID0gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4ubGVuZ3RoID8gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4gOiB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVGcmFtZUFycl92biA9IHdpbmRvdy5nbG9iYWxEYXRhXzguc3ByaXRlRnJhbWVBcnJfdm4gfHwgW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVGcmFtZUFycl92biA9IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuIDogdGhpcy5zcHJpdGVGcmFtZUFycl92bjtcclxuXHJcbiAgICAgICAgbGV0IGxhbmd1YWdlID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZExhbmd1YWdlJykgfHwgTGFuZ3VhZ2UuRU47XHJcblxyXG4gICAgICAgIGxldCBsYW5ndWFnZU9iajogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHt9O1xyXG4gICAgICAgIHN3aXRjaCAobGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5aSDpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy56aExhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuVk46XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuaW5MYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLkVOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmVuTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFiZWxBcnIuZm9yRWFjaCgobGFiZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGxhbmd1YWdlT2JqW2luZGV4XSB8fCAnJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=