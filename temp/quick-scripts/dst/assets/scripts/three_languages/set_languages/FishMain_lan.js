
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/three_languages/set_languages/FishMain_lan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '08c87Or0SxL5aE2cvUmlzr/', 'FishMain_lan');
// scripts/three_languages/set_languages/FishMain_lan.ts

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
var FishMain_lan = /** @class */ (function (_super) {
    __extends(FishMain_lan, _super);
    function FishMain_lan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelArr = [];
        _this.zhLanguage = {
            0: '累积 JackPot',
            1: '～随时归您～',
            2: '锁定',
            3: '自动',
            4: '确认',
            5: '取消',
            6: '确认退出游戏？',
            7: '提示',
            8: '音乐开关',
            9: '音效开关',
            10: '设置',
            11: '正在返回大厅...',
            12: '一网打尽',
            13: '大三元',
            14: '赔率X3',
            15: '大四喜',
            16: '赔率X4',
            17: '小刺鱼',
            18: '小草鱼',
            19: '小黄鱼',
            20: '泡泡鱼',
            21: '小紫鱼',
            22: '尼莫',
            23: '河豚',
            24: '蓝鱼',
            25: '灯笼鱼',
            26: '神仙鱼',
            27: '乌龟',
            28: '蝴蝶鱼',
            29: '孔雀鱼',
            30: '剑鱼',
            31: '蝙蝠鱼',
            32: '大白鲨',
            33: '大金鲨',
            34: '蜻蜓鱼',
            35: '龙虾',
            36: '海豚',
            37: '金龙',
            38: '金蟾',
            39: '黄金鲨',
            40: '钻石',
            41: '钻石',
            42: '钻石',
            43: '钻石',
            44: '钻石',
            45: '局部炸弹',
            46: '全屏炸弹',
            47: '鱼种'
        };
        _this.enLanguage = {
            0: 'Cumulative JackPot',
            1: '~ At your disposal ~ ',
            2: 'Lock ',
            3: 'Automatic ',
            4: 'Confirm ',
            5: 'Cancel ',
            6: 'Are you sure to quit the game? ',
            7: 'Prompt ',
            8: 'Music switch ',
            9: 'Sound switch ',
            10: 'Settings ',
            11: 'Is returning to the hall... ',
            12: 'A net sweep ',
            13: 'Big three ',
            14: 'odds X3',
            15: 'Fourth Year happiness ',
            16: 'Odds X4',
            17: 'Little Stickleback ',
            18: 'Little grass carp ',
            19: 'Little Yellow croaker ',
            20: 'Bubble fish ',
            21: 'Little Purple Fish ',
            22: 'Nemo ',
            23: 'Puffer fish ',
            24: 'Blue fish ',
            25: 'Lantern Fish ',
            26: 'Angelfish ',
            27: 'Turtle ',
            28: 'Butterfly fish ',
            29: 'Guppy ',
            30: 'Swordfish ',
            31: 'Batfish ',
            32: 'Jaws ',
            33: 'The Great Golden Shark ',
            34: 'Dragonfly ',
            35: 'Lobster ',
            36: 'Dolphin ',
            37: 'Golden Dragon ',
            38: 'Golden Toad ',
            39: 'Golden Shark ',
            40: 'Diamond ',
            41: 'Diamond ',
            42: 'Diamond ',
            43: 'Diamond ',
            44: 'Diamond ',
            45: 'Local bombs ',
            46: 'Full Screen bomb ',
            47: 'Species of fish'
        };
        _this.inLanguage = {
            0: 'menumpuk JackPot ',
            1: 'yang akan menjadi milikmu',
            2: 'Kunci',
            3: "otomatis",
            4: 'dikonfirmasi ',
            5: 'Pembatalan',
            6: 'konfirmasi meninggalkan permainan? ',
            7: 'petunjuk',
            8: 'tombol musik',
            9: 'Sub by',
            10: "setting",
            11: 'kembali menuju lobi',
            12: 'finished',
            13: 'Ta san yuan',
            14: "odds X3",
            15: 'selamat tahun senior ',
            16: "odds ds X4",
            17: 'menyengat kecil',
            18: "ikan kecil",
            19: 'ikan kuning kecil',
            20: "泡泡鱼",
            21: 'ikan kecubung',
            22: "nemo",
            23: "ikan buntal",
            24: "bluefish",
            25: 'lentera ikan',
            26: "ikan peri",
            27: "tortoids",
            28: 'ikan kupu-kupu',
            29: 'Ikan guppy',
            30: "swordfish",
            31: "batfish",
            32: "jaws",
            33: 'great gold shark ',
            34: "ikan capung",
            35: "lobster",
            36: 'dolphin',
            37: 'Kingdragon',
            38: "katak emas",
            39: ' Hiu emas',
            40: 'diamond',
            41: 'diamond',
            42: 'Berlian',
            43: 'diamond',
            44: 'Berlian',
            45: "bom lokal",
            46: 'bom layar penuh',
            47: "penanaman ikan"
        };
        _this.spriteArr = [];
        _this.spriteFrameArr_zh = [];
        _this.spriteFrameArr_en = [];
        _this.spriteFrameArr_vn = [];
        return _this;
    }
    FishMain_lan.prototype.start = function () {
        this.setLanguage();
    };
    FishMain_lan.prototype.setLanguage = function () {
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
    ], FishMain_lan.prototype, "labelArr", void 0);
    __decorate([
        property({ type: [cc.Sprite], tooltip: '替换的Sprite' })
    ], FishMain_lan.prototype, "spriteArr", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的中文图片' })
    ], FishMain_lan.prototype, "spriteFrameArr_zh", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的英文图片' })
    ], FishMain_lan.prototype, "spriteFrameArr_en", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], tooltip: '替换的印尼图片' })
    ], FishMain_lan.prototype, "spriteFrameArr_vn", void 0);
    FishMain_lan = __decorate([
        ccclass
    ], FishMain_lan);
    return FishMain_lan;
}(cc.Component));
exports.default = FishMain_lan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxGaXNoTWFpbl9sYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBSyxRQUlKO0FBSkQsV0FBSyxRQUFRO0lBQ1QseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7SUFDYix5QkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFKSSxRQUFRLEtBQVIsUUFBUSxRQUlaO0FBR0Q7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUE0TUM7UUF6TUcsY0FBUSxHQUFlLEVBQUUsQ0FBQztRQUUxQixnQkFBVSxHQUE4QjtZQUNwQyxDQUFDLEVBQUUsWUFBWTtZQUNmLENBQUMsRUFBRSxRQUFRO1lBQ1gsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsU0FBUztZQUNaLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsTUFBTTtZQUNULEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLFdBQVc7WUFDZixFQUFFLEVBQUUsTUFBTTtZQUNWLEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLE1BQU07WUFDVixFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxNQUFNO1lBQ1YsRUFBRSxFQUFFLEtBQUs7WUFDVCxFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLEtBQUs7WUFDVCxFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLElBQUk7WUFDUixF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TUQsQUE0TUMsQ0E1TXlDLEVBQUUsQ0FBQyxTQUFTLEdBNE1yRDtrQkE1TW9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZW51bSBMYW5ndWFnZSB7XHJcbiAgICBaSCA9ICd0eHQuemgnLFxyXG4gICAgVk4gPSAndHh0LnZuJyxcclxuICAgIEVOID0gJ3R4dC5lbidcclxufVxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlzaE1haW5fbGFuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuTGFiZWxdLCB0b29sdGlwOiAn5pu/5o2i55qETGFiZWwnIH0pXHJcbiAgICBsYWJlbEFycjogY2MuTGFiZWxbXSA9IFtdO1xyXG5cclxuICAgIHpoTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ+e0r+enryBKYWNrUG90JyxcclxuICAgICAgICAxOiAn772e6ZqP5pe25b2S5oKo772eJyxcclxuICAgICAgICAyOiAn6ZSB5a6aJyxcclxuICAgICAgICAzOiAn6Ieq5YqoJyxcclxuICAgICAgICA0OiAn56Gu6K6kJyxcclxuICAgICAgICA1OiAn5Y+W5raIJyxcclxuICAgICAgICA2OiAn56Gu6K6k6YCA5Ye65ri45oiP77yfJyxcclxuICAgICAgICA3OiAn5o+Q56S6JyxcclxuICAgICAgICA4OiAn6Z+z5LmQ5byA5YWzJyxcclxuICAgICAgICA5OiAn6Z+z5pWI5byA5YWzJyxcclxuICAgICAgICAxMDogJ+iuvue9ricsXHJcbiAgICAgICAgMTE6ICfmraPlnKjov5Tlm57lpKfljoUuLi4nLFxyXG4gICAgICAgIDEyOiAn5LiA572R5omT5bC9JyxcclxuICAgICAgICAxMzogJ+Wkp+S4ieWFgycsXHJcbiAgICAgICAgMTQ6ICfotZTnjodYMycsXHJcbiAgICAgICAgMTU6ICflpKflm5vllpwnLFxyXG4gICAgICAgIDE2OiAn6LWU546HWDQnLFxyXG4gICAgICAgIDE3OiAn5bCP5Yi66bG8JyxcclxuICAgICAgICAxODogJ+Wwj+iNiemxvCcsXHJcbiAgICAgICAgMTk6ICflsI/pu4TpsbwnLFxyXG4gICAgICAgIDIwOiAn5rOh5rOh6bG8JyxcclxuICAgICAgICAyMTogJ+Wwj+e0q+mxvCcsXHJcbiAgICAgICAgMjI6ICflsLzojqsnLFxyXG4gICAgICAgIDIzOiAn5rKz6LGaJyxcclxuICAgICAgICAyNDogJ+iTnemxvCcsXHJcbiAgICAgICAgMjU6ICfnga/nrLzpsbwnLFxyXG4gICAgICAgIDI2OiAn56We5LuZ6bG8JyxcclxuICAgICAgICAyNzogJ+S5jOm+nycsXHJcbiAgICAgICAgMjg6ICfonbTonbbpsbwnLFxyXG4gICAgICAgIDI5OiAn5a2U6ZuA6bG8JyxcclxuICAgICAgICAzMDogJ+WJkemxvCcsXHJcbiAgICAgICAgMzE6ICfonZnonaDpsbwnLFxyXG4gICAgICAgIDMyOiAn5aSn55m96bKoJyxcclxuICAgICAgICAzMzogJ+Wkp+mHkemyqCcsXHJcbiAgICAgICAgMzQ6ICfonLvonJPpsbwnLFxyXG4gICAgICAgIDM1OiAn6b6Z6Jm+JyxcclxuICAgICAgICAzNjogJ+a1t+ixmicsXHJcbiAgICAgICAgMzc6ICfph5HpvpknLFxyXG4gICAgICAgIDM4OiAn6YeR6J++JyxcclxuICAgICAgICAzOTogJ+m7hOmHkemyqCcsXHJcbiAgICAgICAgNDA6ICfpkrvnn7MnLFxyXG4gICAgICAgIDQxOiAn6ZK755+zJyxcclxuICAgICAgICA0MjogJ+mSu+efsycsXHJcbiAgICAgICAgNDM6ICfpkrvnn7MnLFxyXG4gICAgICAgIDQ0OiAn6ZK755+zJyxcclxuICAgICAgICA0NTogJ+WxgOmDqOeCuOW8uScsXHJcbiAgICAgICAgNDY6ICflhajlsY/ngrjlvLknLFxyXG4gICAgICAgIDQ3OiAn6bG856eNJ1xyXG4gICAgfTtcclxuXHJcbiAgICBlbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICdDdW11bGF0aXZlIEphY2tQb3QnLFxyXG4gICAgICAgIDE6ICd+IEF0IHlvdXIgZGlzcG9zYWwgfiAnLFxyXG4gICAgICAgIDI6ICdMb2NrICcsXHJcbiAgICAgICAgMzogJ0F1dG9tYXRpYyAnLFxyXG4gICAgICAgIDQ6ICdDb25maXJtICcsXHJcbiAgICAgICAgNTogJ0NhbmNlbCAnLFxyXG4gICAgICAgIDY6ICdBcmUgeW91IHN1cmUgdG8gcXVpdCB0aGUgZ2FtZT8gJyxcclxuICAgICAgICA3OiAnUHJvbXB0ICcsXHJcbiAgICAgICAgODogJ011c2ljIHN3aXRjaCAnLFxyXG4gICAgICAgIDk6ICdTb3VuZCBzd2l0Y2ggJyxcclxuICAgICAgICAxMDogJ1NldHRpbmdzICcsXHJcbiAgICAgICAgMTE6ICdJcyByZXR1cm5pbmcgdG8gdGhlIGhhbGwuLi4gJyxcclxuICAgICAgICAxMjogJ0EgbmV0IHN3ZWVwICcsXHJcbiAgICAgICAgMTM6ICdCaWcgdGhyZWUgJyxcclxuICAgICAgICAxNDogJ29kZHMgWDMnLFxyXG4gICAgICAgIDE1OiAnRm91cnRoIFllYXIgaGFwcGluZXNzICcsXHJcbiAgICAgICAgMTY6ICdPZGRzIFg0JyxcclxuICAgICAgICAxNzogJ0xpdHRsZSBTdGlja2xlYmFjayAnLFxyXG4gICAgICAgIDE4OiAnTGl0dGxlIGdyYXNzIGNhcnAgJyxcclxuICAgICAgICAxOTogJ0xpdHRsZSBZZWxsb3cgY3JvYWtlciAnLFxyXG4gICAgICAgIDIwOiAnQnViYmxlIGZpc2ggJyxcclxuICAgICAgICAyMTogJ0xpdHRsZSBQdXJwbGUgRmlzaCAnLFxyXG4gICAgICAgIDIyOiAnTmVtbyAnLFxyXG4gICAgICAgIDIzOiAnUHVmZmVyIGZpc2ggJyxcclxuICAgICAgICAyNDogJ0JsdWUgZmlzaCAnLFxyXG4gICAgICAgIDI1OiAnTGFudGVybiBGaXNoICcsXHJcbiAgICAgICAgMjY6ICdBbmdlbGZpc2ggJyxcclxuICAgICAgICAyNzogJ1R1cnRsZSAnLFxyXG4gICAgICAgIDI4OiAnQnV0dGVyZmx5IGZpc2ggJyxcclxuICAgICAgICAyOTogJ0d1cHB5ICcsXHJcbiAgICAgICAgMzA6ICdTd29yZGZpc2ggJyxcclxuICAgICAgICAzMTogJ0JhdGZpc2ggJyxcclxuICAgICAgICAzMjogJ0phd3MgJyxcclxuICAgICAgICAzMzogJ1RoZSBHcmVhdCBHb2xkZW4gU2hhcmsgJyxcclxuICAgICAgICAzNDogJ0RyYWdvbmZseSAnLFxyXG4gICAgICAgIDM1OiAnTG9ic3RlciAnLFxyXG4gICAgICAgIDM2OiAnRG9scGhpbiAnLFxyXG4gICAgICAgIDM3OiAnR29sZGVuIERyYWdvbiAnLFxyXG4gICAgICAgIDM4OiAnR29sZGVuIFRvYWQgJyxcclxuICAgICAgICAzOTogJ0dvbGRlbiBTaGFyayAnLFxyXG4gICAgICAgIDQwOiAnRGlhbW9uZCAnLFxyXG4gICAgICAgIDQxOiAnRGlhbW9uZCAnLFxyXG4gICAgICAgIDQyOiAnRGlhbW9uZCAnLFxyXG4gICAgICAgIDQzOiAnRGlhbW9uZCAnLFxyXG4gICAgICAgIDQ0OiAnRGlhbW9uZCAnLFxyXG4gICAgICAgIDQ1OiAnTG9jYWwgYm9tYnMgJyxcclxuICAgICAgICA0NjogJ0Z1bGwgU2NyZWVuIGJvbWIgJyxcclxuICAgICAgICA0NzogJ1NwZWNpZXMgb2YgZmlzaCdcclxuICAgIH07XHJcblxyXG4gICAgaW5MYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAnbWVudW1wdWsgSmFja1BvdCAnLFxyXG4gICAgICAgIDE6ICd5YW5nIGFrYW4gbWVuamFkaSBtaWxpa211JyxcclxuICAgICAgICAyOiAnS3VuY2knLFxyXG4gICAgICAgIDM6IFwib3RvbWF0aXNcIixcclxuICAgICAgICA0OiAnZGlrb25maXJtYXNpICcsXHJcbiAgICAgICAgNTogJ1BlbWJhdGFsYW4nLFxyXG4gICAgICAgIDY6ICdrb25maXJtYXNpIG1lbmluZ2dhbGthbiBwZXJtYWluYW4/ICcsXHJcbiAgICAgICAgNzogJ3BldHVuanVrJyxcclxuICAgICAgICA4OiAndG9tYm9sIG11c2lrJyxcclxuICAgICAgICA5OiAnU3ViIGJ5JyxcclxuICAgICAgICAxMDogXCJzZXR0aW5nXCIsXHJcbiAgICAgICAgMTE6ICdrZW1iYWxpIG1lbnVqdSBsb2JpJyxcclxuICAgICAgICAxMjogJ2ZpbmlzaGVkJyxcclxuICAgICAgICAxMzogJ1RhIHNhbiB5dWFuJyxcclxuICAgICAgICAxNDogXCJvZGRzIFgzXCIsXHJcbiAgICAgICAgMTU6ICdzZWxhbWF0IHRhaHVuIHNlbmlvciAnLFxyXG4gICAgICAgIDE2OiBcIm9kZHMgZHMgWDRcIixcclxuICAgICAgICAxNzogJ21lbnllbmdhdCBrZWNpbCcsXHJcbiAgICAgICAgMTg6IFwiaWthbiBrZWNpbFwiLFxyXG4gICAgICAgIDE5OiAnaWthbiBrdW5pbmcga2VjaWwnLFxyXG4gICAgICAgIDIwOiBcIuazoeazoemxvFwiLFxyXG4gICAgICAgIDIxOiAnaWthbiBrZWN1YnVuZycsXHJcbiAgICAgICAgMjI6IFwibmVtb1wiLFxyXG4gICAgICAgIDIzOiBcImlrYW4gYnVudGFsXCIsXHJcbiAgICAgICAgMjQ6IFwiYmx1ZWZpc2hcIixcclxuICAgICAgICAyNTogJ2xlbnRlcmEgaWthbicsXHJcbiAgICAgICAgMjY6IFwiaWthbiBwZXJpXCIsXHJcbiAgICAgICAgMjc6IFwidG9ydG9pZHNcIixcclxuICAgICAgICAyODogJ2lrYW4ga3VwdS1rdXB1JyxcclxuICAgICAgICAyOTogJ0lrYW4gZ3VwcHknLFxyXG4gICAgICAgIDMwOiBcInN3b3JkZmlzaFwiLFxyXG4gICAgICAgIDMxOiBcImJhdGZpc2hcIixcclxuICAgICAgICAzMjogXCJqYXdzXCIsXHJcbiAgICAgICAgMzM6ICdncmVhdCBnb2xkIHNoYXJrICcsXHJcbiAgICAgICAgMzQ6IFwiaWthbiBjYXB1bmdcIixcclxuICAgICAgICAzNTogXCJsb2JzdGVyXCIsXHJcbiAgICAgICAgMzY6ICdkb2xwaGluJyxcclxuICAgICAgICAzNzogJ0tpbmdkcmFnb24nLFxyXG4gICAgICAgIDM4OiBcImthdGFrIGVtYXNcIixcclxuICAgICAgICAzOTogJyBIaXUgZW1hcycsXHJcbiAgICAgICAgNDA6ICdkaWFtb25kJyxcclxuICAgICAgICA0MTogJ2RpYW1vbmQnLFxyXG4gICAgICAgIDQyOiAnQmVybGlhbicsXHJcbiAgICAgICAgNDM6ICdkaWFtb25kJyxcclxuICAgICAgICA0NDogJ0JlcmxpYW4nLFxyXG4gICAgICAgIDQ1OiBcImJvbSBsb2thbFwiLFxyXG4gICAgICAgIDQ2OiAnYm9tIGxheWFyIHBlbnVoJyxcclxuICAgICAgICA0NzogXCJwZW5hbmFtYW4gaWthblwiXHJcbiAgICB9O1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVdLCB0b29sdGlwOiAn5pu/5o2i55qEU3ByaXRlJyB9KVxyXG4gICAgc3ByaXRlQXJyOiBjYy5TcHJpdGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoTkuK3mloflm77niYcnIH0pXHJcbiAgICBzcHJpdGVGcmFtZUFycl96aDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoToi7Hmloflm77niYcnIH0pXHJcbiAgICBzcHJpdGVGcmFtZUFycl9lbjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoTljbDlsLzlm77niYcnIH0pXHJcbiAgICBzcHJpdGVGcmFtZUFycl92bjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRMYW5ndWFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0TGFuZ3VhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxhbmd1YWdlID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZExhbmd1YWdlJykgfHwgTGFuZ3VhZ2UuRU47XHJcblxyXG4gICAgICAgIGxldCBsYW5ndWFnZU9iajogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHt9O1xyXG4gICAgICAgIHN3aXRjaCAobGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5aSDpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy56aExhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNwcml0ZUZyYW1lQXJyX3poLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVBcnJbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUZyYW1lQXJyX3poW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuVk46XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuaW5MYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zcHJpdGVGcmFtZUFycl92bi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlQXJyW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVGcmFtZUFycl92bltpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLkVOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmVuTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUFycltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW5baV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFiZWxBcnIuZm9yRWFjaCgobGFiZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGxhbmd1YWdlT2JqW2luZGV4XSB8fCAnJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=