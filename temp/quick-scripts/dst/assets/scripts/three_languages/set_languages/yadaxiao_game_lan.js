
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
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
"use strict";
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
        this.setLanguage();
    };
    yadaxiao_game_lan.prototype.setLanguage = function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFx5YWRheGlhb19nYW1lX2xhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFLLFFBSUo7QUFKRCxXQUFLLFFBQVE7SUFDVCx5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7QUFDakIsQ0FBQyxFQUpJLFFBQVEsS0FBUixRQUFRLFFBSVo7QUFHRDtJQUErQyxxQ0FBWTtJQUEzRDtRQUFBLHFFQWlIQztRQTlHRyxjQUFRLEdBQWUsRUFBRSxDQUFDO1FBRTFCLGdCQUFVLEdBQThCO1lBQ3BDLENBQUMsRUFBRSxVQUFVO1lBQ2IsQ0FBQyxFQUFFLEtBQUs7WUFDUixDQUFDLEVBQUUsS0FBSztZQUNSLENBQUMsRUFBRSxLQUFLO1lBQ1IsQ0FBQyxFQUFFLEtBQUs7WUFDUixDQUFDLEVBQUUsUUFBUTtZQUNYLENBQUMsRUFBRSxNQUFNO1lBQ1QsQ0FBQyxFQUFFLFFBQVE7WUFDWCxDQUFDLEVBQUUsUUFBUTtZQUNYLENBQUMsRUFBRSxVQUFVO1lBQ2IsRUFBRSxFQUFFLFVBQVU7WUFDZCxFQUFFLEVBQUUsV0FBVztZQUNmLEVBQUUsRUFBRSxRQUFRO1lBQ1osRUFBRSxFQUFFLFNBQVM7WUFDYixFQUFFLEVBQUUsU0FBUztZQUNiLEVBQUUsRUFBRSxTQUFTO1lBQ2IsRUFBRSxFQUFFLElBQUk7WUFDUixFQUFFLEVBQUUsSUFBSTtZQUNSLEVBQUUsRUFBRSxRQUFRO1lBQ1osRUFBRSxFQUFFLE1BQU07WUFDVixFQUFFLEVBQUUsYUFBYTtZQUNqQixFQUFFLEVBQUUsY0FBYztZQUNsQixFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxNQUFN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UCxDQUFDO0lBN0dEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQzt1REFDMUI7SUFIVCxpQkFBaUI7UUFEckMsT0FBTztPQUNhLGlCQUFpQixDQWlIckM7SUFBRCx3QkFBQztDQWpIRCxBQWlIQyxDQWpIOEMsRUFBRSxDQUFDLFNBQVMsR0FpSDFEO2tCQWpIb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgWkggPSAndHh0LnpoJyxcclxuICAgIFZOID0gJ3R4dC52bicsXHJcbiAgICBFTiA9ICd0eHQuZW4nXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHlhZGF4aWFvX2dhbWVfbGFuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTGFiZWxdLCB0b29sdGlwOiAn5pu/5o2i55qETGFiZWwnIH0pXHJcbiAgICBsYWJlbEFycjogY2MuTGFiZWxbXSA9IFtdO1xyXG5cclxuICAgIHpoTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ+ivt+WFiOWFiOaLqeS4gOasoeWkp+WwjycsXHJcbiAgICAgICAgMTogJ+S4iumZkO+8micsXHJcbiAgICAgICAgMjogJ+WOi+Wkp++8micsICAgIFxyXG4gICAgICAgIDM6ICfkuIrpmZDvvJonLFxyXG4gICAgICAgIDQ6ICfljovlsI/vvJonLFxyXG4gICAgICAgIDU6ICfnrYnlvoXkuK3jgILjgILjgIInLFxyXG4gICAgICAgIDY6ICfmiqLluoTmlbDlgLwnLFxyXG4gICAgICAgIDc6ICflnKjnur/kurrmlbA6MCcsXHJcbiAgICAgICAgODogJ+S4i+azqOS6uuaVsDowJyxcclxuICAgICAgICA5OiAn6K+35YWI5YWI5oup5LiA5qyh5aSn5bCPJyxcclxuICAgICAgICAxMDogJ+acrOWxgOaCqOeahOS4iuW6hOmHkeW4gScsXHJcbiAgICAgICAgMTE6ICfmgqjmnKzlsYDnmoTkuIroo4XliIbmlbDmmK8nLFxyXG4gICAgICAgIDEyOiAn5pys5bGA5oKo55qE6YeR5biBJyxcclxuICAgICAgICAxMzogJ+acrOWxgOaCqOWFseS4i+azqOWkpycsXHJcbiAgICAgICAgMTQ6ICfmnKzlsYDmgqjlhbHkuIvms6jlsI8nLFxyXG4gICAgICAgIDE1OiAn5pys5bGA57uT5p6cICA/JyxcclxuICAgICAgICAxNjogJ+i0puWPtycsXHJcbiAgICAgICAgMTc6ICfph5HluIEnLFxyXG4gICAgICAgIDE4OiAn6K+35aGr5YaZ6YeR5biB5pWwJyxcclxuICAgICAgICAxOTogJ+W8gOWni+aKouW6hCcsXHJcbiAgICAgICAgMjA6ICflv6vljovojIPlm7TvvJoxLTEwMDAnLFxyXG4gICAgICAgIDIxOiAn5oqi5bqE6IyD5Zu077yaMTDkuIctMzDkuIcnLFxyXG4gICAgICAgIDIyOiAn5a+M6LGq5qacJyxcclxuICAgICAgICAyMzogJ+WBnOatouS4i+azqCcsXHJcbiAgICAgICAgMjQ6ICflvIDlp4vkuIvms6gnXHJcbiAgICB9O1xyXG5cclxuICAgIGVuTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ1BsZWFzZSBzZWxlY3QgYSBzaXplIGZpcnN0ICcsXHJcbiAgICAgICAgMTogJ1VwcGVyIGxpbWl0OiAnLFxyXG4gICAgICAgIDI6ICdQcmVzcyBiaWc6ICcsXHJcbiAgICAgICAgMzogJ1VwcGVyIGxpbWl0OiAnLFxyXG4gICAgICAgIDQ6ICdQcmVzcyBzbWFsbDogJyxcclxuICAgICAgICA1OiAnV2FpdGluZy4uLiAnLFxyXG4gICAgICAgIDY6ICdzbmF0Y2ggdmFsdWUgJyxcclxuICAgICAgICA3OiAnTnVtYmVyIG9mIHBlb3BsZSBvbmxpbmUgOjAnLFxyXG4gICAgICAgIDg6ICdOdW1iZXIgb2YgYmV0cyA6MCcsXHJcbiAgICAgICAgOTogJ1BsZWFzZSBjaG9vc2UgYSBzaXplIGZpcnN0ICcsXHJcbiAgICAgICAgMTA6ICdUaGlzIGlzIHlvdXIgZ29sZCBjb2luICcsXHJcbiAgICAgICAgMTE6ICdZb3VyIHRvcCBzY29yZSBpbiB0aGlzIGJ1cmVhdSBpcyAnLFxyXG4gICAgICAgIDEyOiAnVGhpcyBidXJlYXUgeW91ciBnb2xkIGNvaW4gJyxcclxuICAgICAgICAxMzogJ1lvdSBiZXQgYmlnIGluIHRoaXMgZ2FtZSAnLFxyXG4gICAgICAgIDE0OiAnVGhpcyBib2FyZCB5b3UgdG90YWwgYmV0IHNtYWxsICcsXHJcbiAgICAgICAgMTU6ICdUaGlzIGJ1cmVhdSByZXN1bHQ/ICcsXHJcbiAgICAgICAgMTY6ICdBY2NvdW50IG51bWJlciAnLFxyXG4gICAgICAgIDE3OiAnR29sZCBjb2luICcsXHJcbiAgICAgICAgMTg6ICdQbGVhc2UgZmlsbCBpbiB0aGUgbnVtYmVyIG9mIGdvbGQgY29pbnMgJyxcclxuICAgICAgICAxOTogJ1N0YXJ0IHJvYmJpbmcgJyxcclxuICAgICAgICAyMDogJ0Zhc3QgcHJlc3N1cmUgcmFuZ2U6IDEtMTAwMCcsXHJcbiAgICAgICAgMjE6ICdSb2JiZXJ5IHJhbmdlOiAxMDAsMDAwLTMwMCwwMDAgJyxcclxuICAgICAgICAyMjogJ1JpY2ggTGlzdCAnLFxyXG4gICAgICAgIDIzOiAnU3RvcCBiZXR0aW5nICcsXHJcbiAgICAgICAgMjQ6ICdTdGFydCBiZXR0aW5nJ1xyXG4gICAgfTtcclxuXHJcbiAgICBpbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICdzaWxha2FuIHBpbGloIHVrdXJhbiBwZXJ0YW1hICcsXHJcbiAgICAgICAgMTogJ2JhdGFzIGF0YXM6ICcsXHJcbiAgICAgICAgMjogJ3Rla2FuIGJlc2FyOiAnLFxyXG4gICAgICAgIDM6ICdiYXRhcyBhdGFzOiAnLFxyXG4gICAgICAgIDQ6ICd0ZWthbiBrZWNpbDogJyxcclxuICAgICAgICA1OiAnbWVudW5nZ3Ug4oCmICcsXHJcbiAgICAgICAgNjogJ3JlYnV0IG5pbGFpICcsXHJcbiAgICAgICAgNzogJ2p1bWxhaCBvcmFuZyBvbmxpbmUgOjAnLFxyXG4gICAgICAgIDg6ICdqdW1sYWggdGFydWhhbiA6MCcsXHJcbiAgICAgICAgOTogJ3BpbGlobGFoIHVrdXJhbiB5YW5nIHBlcnRhbWEgJyxcclxuICAgICAgICAxMDogJ2luaSBhZGFsYWggdWFuZyBsb2dhbSBlbWFzbXUgJyxcclxuICAgICAgICAxMTogJ3Nrb3IgdXRhbWEgYW5kYSBkaSBiaXJvIGluaSBhZGFsYWggJyxcclxuICAgICAgICAxMjogJ2Jpcm8gaW5pIGtvaW4gZW1hc211ICcsXHJcbiAgICAgICAgMTM6ICdhbmRhIGJlcnRhcnVoIGJlc2FyIGRhbGFtIHBlcm1haW5hbiBpbmkgJyxcclxuICAgICAgICAxNDogJ3BhcGFuIGluaSB0YXJ1aGFubnlhIGtlY2lsICcsXHJcbiAgICAgICAgMTU6ICdoYXNpbCBkYXJpIGJpcm8gaW5pPyAnLFxyXG4gICAgICAgIDE2OiAnbm9tb3IgcmVrZW5pbmcgJyxcclxuICAgICAgICAxNzogJ2tvaW4gZW1hcyAnLFxyXG4gICAgICAgIDE4OiAnc2lsYWthbiBpc2kganVtbGFoIGtvaW4gZW1hcyAnLFxyXG4gICAgICAgIDE5OiAnbXVsYWkgbWVyYW1wb2sgJyxcclxuICAgICAgICAyMDogJ2tpc2FyYW4gdGVrYW5hbiBjZXBhdDogMS0xMDAwJyxcclxuICAgICAgICAyMTogJ2tpc2FyYW4gcGVyYW1wb2thbjogMTAwLjAwMCDigJQgMzAwLjAwMCAnLFxyXG4gICAgICAgIDIyOiAnZGFmdGFyIGtheWEgJyxcclxuICAgICAgICAyMzogJ1N0b3AgYmV0dGluZyAnLFxyXG4gICAgICAgIDI0OiAnbXVsYWkgYmVydGFydWgnXHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldExhbmd1YWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRMYW5ndWFnZSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGFuZ3VhZ2UgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NlbGVjdGVkTGFuZ3VhZ2UnKSB8fCBMYW5ndWFnZS5FTjtcclxuXHJcbiAgICAgICAgbGV0IGxhbmd1YWdlT2JqOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge307XHJcbiAgICAgICAgc3dpdGNoIChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLlpIOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLnpoTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5WTjpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy5pbkxhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuRU46XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuZW5MYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sYWJlbEFyci5mb3JFYWNoKChsYWJlbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gbGFuZ3VhZ2VPYmpbaW5kZXhdIHx8ICcnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==