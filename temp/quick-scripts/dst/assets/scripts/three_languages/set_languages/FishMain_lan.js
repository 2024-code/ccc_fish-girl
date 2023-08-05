
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
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_5) {
            window.globalData_5 = {};
        }
        window.globalData_5.labelArr = this.labelArr;
        window.globalData_5.spriteArr = this.spriteArr;
        window.globalData_5.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_5.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_5.spriteFrameArr_vn = this.spriteFrameArr_vn;
        this.setLanguage();
    };
    FishMain_lan.prototype.setLanguage = function () {
        var persistNode = cc.director.getScene().getChildByName('init_language');
        var yourScriptComponent = persistNode.getComponent('FishMain_lan');
        var globalLabelArr = window.globalData_5.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;
        var globalSpriteArr = window.globalData_5.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;
        var globalSpriteFrameArr_zh = window.globalData_5.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;
        var globalSpriteFrameArr_en = window.globalData_5.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;
        var globalSpriteFrameArr_vn = window.globalData_5.spriteFrameArr_vn || [];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGhyZWVfbGFuZ3VhZ2VzXFxzZXRfbGFuZ3VhZ2VzXFxGaXNoTWFpbl9sYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBSyxRQUlKO0FBSkQsV0FBSyxRQUFRO0lBQ1QseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7SUFDYix5QkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFKSSxRQUFRLEtBQVIsUUFBUSxRQUlaO0FBV0Q7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUF3T0M7UUFyT0csY0FBUSxHQUFlLEVBQUUsQ0FBQztRQUUxQixnQkFBVSxHQUE4QjtZQUNwQyxDQUFDLEVBQUUsWUFBWTtZQUNmLENBQUMsRUFBRSxRQUFRO1lBQ1gsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsU0FBUztZQUNaLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsTUFBTTtZQUNULEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLFdBQVc7WUFDZixFQUFFLEVBQUUsTUFBTTtZQUNWLEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLE1BQU07WUFDVixFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxNQUFNO1lBQ1YsRUFBRSxFQUFFLEtBQUs7WUFDVCxFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLEtBQUs7WUFDVCxFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLElBQUk7WUFDUixF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MUI7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDO21EQUMxQjtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7MkRBQ2hCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQzsyREFDaEI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDOzJEQUNoQjtJQXhLeEIsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQXdPaEM7SUFBRCxtQkFBQztDQXhPRCxBQXdPQyxDQXhPeUMsRUFBRSxDQUFDLFNBQVMsR0F3T3JEO2tCQXhPb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIExhbmd1YWdlIHtcclxuICAgIFpIID0gJ3R4dC56aCcsXHJcbiAgICBWTiA9ICd0eHQudm4nLFxyXG4gICAgRU4gPSAndHh0LmVuJ1xyXG59XHJcblxyXG5pbnRlcmZhY2UgR2xvYmFsRGF0YV81IHtcclxuICAgIGxhYmVsQXJyOiBjYy5MYWJlbFtdLFxyXG4gICAgc3ByaXRlQXJyOiBjYy5TcHJpdGVbXSxcclxuICAgIHNwcml0ZUZyYW1lQXJyX3poOiBjYy5TcHJpdGVGcmFtZVtdLFxyXG4gICAgc3ByaXRlRnJhbWVBcnJfZW46IGNjLlNwcml0ZUZyYW1lW10sXHJcbiAgICBzcHJpdGVGcmFtZUFycl92bjogY2MuU3ByaXRlRnJhbWVbXVxyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaXNoTWFpbl9sYW4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5MYWJlbF0sIHRvb2x0aXA6ICfmm7/mjaLnmoRMYWJlbCcgfSlcclxuICAgIGxhYmVsQXJyOiBjYy5MYWJlbFtdID0gW107XHJcblxyXG4gICAgemhMYW5ndWFnZTogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAwOiAn57Sv56evIEphY2tQb3QnLFxyXG4gICAgICAgIDE6ICfvvZ7pmo/ml7blvZLmgqjvvZ4nLFxyXG4gICAgICAgIDI6ICfplIHlrponLFxyXG4gICAgICAgIDM6ICfoh6rliqgnLFxyXG4gICAgICAgIDQ6ICfnoa7orqQnLFxyXG4gICAgICAgIDU6ICflj5bmtognLFxyXG4gICAgICAgIDY6ICfnoa7orqTpgIDlh7rmuLjmiI/vvJ8nLFxyXG4gICAgICAgIDc6ICfmj5DnpLonLFxyXG4gICAgICAgIDg6ICfpn7PkuZDlvIDlhbMnLFxyXG4gICAgICAgIDk6ICfpn7PmlYjlvIDlhbMnLFxyXG4gICAgICAgIDEwOiAn6K6+572uJyxcclxuICAgICAgICAxMTogJ+ato+WcqOi/lOWbnuWkp+WOhS4uLicsXHJcbiAgICAgICAgMTI6ICfkuIDnvZHmiZPlsL0nLFxyXG4gICAgICAgIDEzOiAn5aSn5LiJ5YWDJyxcclxuICAgICAgICAxNDogJ+i1lOeOh1gzJyxcclxuICAgICAgICAxNTogJ+Wkp+Wbm+WWnCcsXHJcbiAgICAgICAgMTY6ICfotZTnjodYNCcsXHJcbiAgICAgICAgMTc6ICflsI/liLrpsbwnLFxyXG4gICAgICAgIDE4OiAn5bCP6I2J6bG8JyxcclxuICAgICAgICAxOTogJ+Wwj+m7hOmxvCcsXHJcbiAgICAgICAgMjA6ICfms6Hms6HpsbwnLFxyXG4gICAgICAgIDIxOiAn5bCP57Sr6bG8JyxcclxuICAgICAgICAyMjogJ+WwvOiOqycsXHJcbiAgICAgICAgMjM6ICfmsrPosZonLFxyXG4gICAgICAgIDI0OiAn6JOd6bG8JyxcclxuICAgICAgICAyNTogJ+eBr+esvOmxvCcsXHJcbiAgICAgICAgMjY6ICfnpZ7ku5npsbwnLFxyXG4gICAgICAgIDI3OiAn5LmM6b6fJyxcclxuICAgICAgICAyODogJ+idtOidtumxvCcsXHJcbiAgICAgICAgMjk6ICflrZTpm4DpsbwnLFxyXG4gICAgICAgIDMwOiAn5YmR6bG8JyxcclxuICAgICAgICAzMTogJ+idmeidoOmxvCcsXHJcbiAgICAgICAgMzI6ICflpKfnmb3psqgnLFxyXG4gICAgICAgIDMzOiAn5aSn6YeR6bKoJyxcclxuICAgICAgICAzNDogJ+icu+ick+mxvCcsXHJcbiAgICAgICAgMzU6ICfpvpnomb4nLFxyXG4gICAgICAgIDM2OiAn5rW36LGaJyxcclxuICAgICAgICAzNzogJ+mHkem+mScsXHJcbiAgICAgICAgMzg6ICfph5Hon74nLFxyXG4gICAgICAgIDM5OiAn6buE6YeR6bKoJyxcclxuICAgICAgICA0MDogJ+mSu+efsycsXHJcbiAgICAgICAgNDE6ICfpkrvnn7MnLFxyXG4gICAgICAgIDQyOiAn6ZK755+zJyxcclxuICAgICAgICA0MzogJ+mSu+efsycsXHJcbiAgICAgICAgNDQ6ICfpkrvnn7MnLFxyXG4gICAgICAgIDQ1OiAn5bGA6YOo54K45by5JyxcclxuICAgICAgICA0NjogJ+WFqOWxj+eCuOW8uScsXHJcbiAgICAgICAgNDc6ICfpsbznp40nXHJcbiAgICB9O1xyXG5cclxuICAgIGVuTGFuZ3VhZ2U6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgMDogJ0N1bXVsYXRpdmUgSmFja1BvdCcsXHJcbiAgICAgICAgMTogJ34gQXQgeW91ciBkaXNwb3NhbCB+ICcsXHJcbiAgICAgICAgMjogJ0xvY2sgJyxcclxuICAgICAgICAzOiAnQXV0b21hdGljICcsXHJcbiAgICAgICAgNDogJ0NvbmZpcm0gJyxcclxuICAgICAgICA1OiAnQ2FuY2VsICcsXHJcbiAgICAgICAgNjogJ0FyZSB5b3Ugc3VyZSB0byBxdWl0IHRoZSBnYW1lPyAnLFxyXG4gICAgICAgIDc6ICdQcm9tcHQgJyxcclxuICAgICAgICA4OiAnTXVzaWMgc3dpdGNoICcsXHJcbiAgICAgICAgOTogJ1NvdW5kIHN3aXRjaCAnLFxyXG4gICAgICAgIDEwOiAnU2V0dGluZ3MgJyxcclxuICAgICAgICAxMTogJ0lzIHJldHVybmluZyB0byB0aGUgaGFsbC4uLiAnLFxyXG4gICAgICAgIDEyOiAnQSBuZXQgc3dlZXAgJyxcclxuICAgICAgICAxMzogJ0JpZyB0aHJlZSAnLFxyXG4gICAgICAgIDE0OiAnb2RkcyBYMycsXHJcbiAgICAgICAgMTU6ICdGb3VydGggWWVhciBoYXBwaW5lc3MgJyxcclxuICAgICAgICAxNjogJ09kZHMgWDQnLFxyXG4gICAgICAgIDE3OiAnTGl0dGxlIFN0aWNrbGViYWNrICcsXHJcbiAgICAgICAgMTg6ICdMaXR0bGUgZ3Jhc3MgY2FycCAnLFxyXG4gICAgICAgIDE5OiAnTGl0dGxlIFllbGxvdyBjcm9ha2VyICcsXHJcbiAgICAgICAgMjA6ICdCdWJibGUgZmlzaCAnLFxyXG4gICAgICAgIDIxOiAnTGl0dGxlIFB1cnBsZSBGaXNoICcsXHJcbiAgICAgICAgMjI6ICdOZW1vICcsXHJcbiAgICAgICAgMjM6ICdQdWZmZXIgZmlzaCAnLFxyXG4gICAgICAgIDI0OiAnQmx1ZSBmaXNoICcsXHJcbiAgICAgICAgMjU6ICdMYW50ZXJuIEZpc2ggJyxcclxuICAgICAgICAyNjogJ0FuZ2VsZmlzaCAnLFxyXG4gICAgICAgIDI3OiAnVHVydGxlICcsXHJcbiAgICAgICAgMjg6ICdCdXR0ZXJmbHkgZmlzaCAnLFxyXG4gICAgICAgIDI5OiAnR3VwcHkgJyxcclxuICAgICAgICAzMDogJ1N3b3JkZmlzaCAnLFxyXG4gICAgICAgIDMxOiAnQmF0ZmlzaCAnLFxyXG4gICAgICAgIDMyOiAnSmF3cyAnLFxyXG4gICAgICAgIDMzOiAnVGhlIEdyZWF0IEdvbGRlbiBTaGFyayAnLFxyXG4gICAgICAgIDM0OiAnRHJhZ29uZmx5ICcsXHJcbiAgICAgICAgMzU6ICdMb2JzdGVyICcsXHJcbiAgICAgICAgMzY6ICdEb2xwaGluICcsXHJcbiAgICAgICAgMzc6ICdHb2xkZW4gRHJhZ29uICcsXHJcbiAgICAgICAgMzg6ICdHb2xkZW4gVG9hZCAnLFxyXG4gICAgICAgIDM5OiAnR29sZGVuIFNoYXJrICcsXHJcbiAgICAgICAgNDA6ICdEaWFtb25kICcsXHJcbiAgICAgICAgNDE6ICdEaWFtb25kICcsXHJcbiAgICAgICAgNDI6ICdEaWFtb25kICcsXHJcbiAgICAgICAgNDM6ICdEaWFtb25kICcsXHJcbiAgICAgICAgNDQ6ICdEaWFtb25kICcsXHJcbiAgICAgICAgNDU6ICdMb2NhbCBib21icyAnLFxyXG4gICAgICAgIDQ2OiAnRnVsbCBTY3JlZW4gYm9tYiAnLFxyXG4gICAgICAgIDQ3OiAnU3BlY2llcyBvZiBmaXNoJ1xyXG4gICAgfTtcclxuXHJcbiAgICBpbkxhbmd1YWdlOiB7IFtrZXk6IG51bWJlcl06IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIDA6ICdtZW51bXB1ayBKYWNrUG90ICcsXHJcbiAgICAgICAgMTogJ3lhbmcgYWthbiBtZW5qYWRpIG1pbGlrbXUnLFxyXG4gICAgICAgIDI6ICdLdW5jaScsXHJcbiAgICAgICAgMzogXCJvdG9tYXRpc1wiLFxyXG4gICAgICAgIDQ6ICdkaWtvbmZpcm1hc2kgJyxcclxuICAgICAgICA1OiAnUGVtYmF0YWxhbicsXHJcbiAgICAgICAgNjogJ2tvbmZpcm1hc2kgbWVuaW5nZ2Fsa2FuIHBlcm1haW5hbj8gJyxcclxuICAgICAgICA3OiAncGV0dW5qdWsnLFxyXG4gICAgICAgIDg6ICd0b21ib2wgbXVzaWsnLFxyXG4gICAgICAgIDk6ICdTdWIgYnknLFxyXG4gICAgICAgIDEwOiBcInNldHRpbmdcIixcclxuICAgICAgICAxMTogJ2tlbWJhbGkgbWVudWp1IGxvYmknLFxyXG4gICAgICAgIDEyOiAnZmluaXNoZWQnLFxyXG4gICAgICAgIDEzOiAnVGEgc2FuIHl1YW4nLFxyXG4gICAgICAgIDE0OiBcIm9kZHMgWDNcIixcclxuICAgICAgICAxNTogJ3NlbGFtYXQgdGFodW4gc2VuaW9yICcsXHJcbiAgICAgICAgMTY6IFwib2RkcyBkcyBYNFwiLFxyXG4gICAgICAgIDE3OiAnbWVueWVuZ2F0IGtlY2lsJyxcclxuICAgICAgICAxODogXCJpa2FuIGtlY2lsXCIsXHJcbiAgICAgICAgMTk6ICdpa2FuIGt1bmluZyBrZWNpbCcsXHJcbiAgICAgICAgMjA6IFwi5rOh5rOh6bG8XCIsXHJcbiAgICAgICAgMjE6ICdpa2FuIGtlY3VidW5nJyxcclxuICAgICAgICAyMjogXCJuZW1vXCIsXHJcbiAgICAgICAgMjM6IFwiaWthbiBidW50YWxcIixcclxuICAgICAgICAyNDogXCJibHVlZmlzaFwiLFxyXG4gICAgICAgIDI1OiAnbGVudGVyYSBpa2FuJyxcclxuICAgICAgICAyNjogXCJpa2FuIHBlcmlcIixcclxuICAgICAgICAyNzogXCJ0b3J0b2lkc1wiLFxyXG4gICAgICAgIDI4OiAnaWthbiBrdXB1LWt1cHUnLFxyXG4gICAgICAgIDI5OiAnSWthbiBndXBweScsXHJcbiAgICAgICAgMzA6IFwic3dvcmRmaXNoXCIsXHJcbiAgICAgICAgMzE6IFwiYmF0ZmlzaFwiLFxyXG4gICAgICAgIDMyOiBcImphd3NcIixcclxuICAgICAgICAzMzogJ2dyZWF0IGdvbGQgc2hhcmsgJyxcclxuICAgICAgICAzNDogXCJpa2FuIGNhcHVuZ1wiLFxyXG4gICAgICAgIDM1OiBcImxvYnN0ZXJcIixcclxuICAgICAgICAzNjogJ2RvbHBoaW4nLFxyXG4gICAgICAgIDM3OiAnS2luZ2RyYWdvbicsXHJcbiAgICAgICAgMzg6IFwia2F0YWsgZW1hc1wiLFxyXG4gICAgICAgIDM5OiAnIEhpdSBlbWFzJyxcclxuICAgICAgICA0MDogJ2RpYW1vbmQnLFxyXG4gICAgICAgIDQxOiAnZGlhbW9uZCcsXHJcbiAgICAgICAgNDI6ICdCZXJsaWFuJyxcclxuICAgICAgICA0MzogJ2RpYW1vbmQnLFxyXG4gICAgICAgIDQ0OiAnQmVybGlhbicsXHJcbiAgICAgICAgNDU6IFwiYm9tIGxva2FsXCIsXHJcbiAgICAgICAgNDY6ICdib20gbGF5YXIgcGVudWgnLFxyXG4gICAgICAgIDQ3OiBcInBlbmFuYW1hbiBpa2FuXCJcclxuICAgIH07XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLlNwcml0ZV0sIHRvb2x0aXA6ICfmm7/mjaLnmoRTcHJpdGUnIH0pXHJcbiAgICBzcHJpdGVBcnI6IGNjLlNwcml0ZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSwgdG9vbHRpcDogJ+abv+aNoueahOS4reaWh+WbvueJhycgfSlcclxuICAgIHNwcml0ZUZyYW1lQXJyX3poOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSwgdG9vbHRpcDogJ+abv+aNoueahOiLseaWh+WbvueJhycgfSlcclxuICAgIHNwcml0ZUZyYW1lQXJyX2VuOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSwgdG9vbHRpcDogJ+abv+aNoueahOWNsOWwvOWbvueJhycgfSlcclxuICAgIHNwcml0ZUZyYW1lQXJyX3ZuOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAvLyDlsIbpnIDopoHkv53nlZnnmoTlsZ7mgKfotYvlgLznu5nlhajlsYDlr7nosaFcclxuICAgICAgICBpZiAoIXdpbmRvdy5nbG9iYWxEYXRhXzUpIHtcclxuICAgICAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfNSA9IHt9IGFzIEdsb2JhbERhdGFfNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfNS5sYWJlbEFyciA9IHRoaXMubGFiZWxBcnI7XHJcbiAgICAgICAgd2luZG93Lmdsb2JhbERhdGFfNS5zcHJpdGVBcnIgPSB0aGlzLnNwcml0ZUFycjtcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV81LnNwcml0ZUZyYW1lQXJyX3poID0gdGhpcy5zcHJpdGVGcmFtZUFycl96aDtcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV81LnNwcml0ZUZyYW1lQXJyX2VuID0gdGhpcy5zcHJpdGVGcmFtZUFycl9lbjtcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsRGF0YV81LnNwcml0ZUZyYW1lQXJyX3ZuID0gdGhpcy5zcHJpdGVGcmFtZUFycl92bjtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRMYW5ndWFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0TGFuZ3VhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcGVyc2lzdE5vZGUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdpbml0X2xhbmd1YWdlJyk7XHJcbiAgICAgICAgY29uc3QgeW91clNjcmlwdENvbXBvbmVudCA9IHBlcnNpc3ROb2RlLmdldENvbXBvbmVudCgnRmlzaE1haW5fbGFuJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbExhYmVsQXJyID0gd2luZG93Lmdsb2JhbERhdGFfNS5sYWJlbEFyciB8fCBbXTtcclxuICAgICAgICB0aGlzLmxhYmVsQXJyID0gZ2xvYmFsTGFiZWxBcnIubGVuZ3RoID8gZ2xvYmFsTGFiZWxBcnIgOiB0aGlzLmxhYmVsQXJyO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVBcnIgPSB3aW5kb3cuZ2xvYmFsRGF0YV81LnNwcml0ZUFyciB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUFyciA9IGdsb2JhbFNwcml0ZUFyci5sZW5ndGggPyBnbG9iYWxTcHJpdGVBcnIgOiB0aGlzLnNwcml0ZUFycjtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xvYmFsU3ByaXRlRnJhbWVBcnJfemggPSB3aW5kb3cuZ2xvYmFsRGF0YV81LnNwcml0ZUZyYW1lQXJyX3poIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVBcnJfemggPSBnbG9iYWxTcHJpdGVGcmFtZUFycl96aC5sZW5ndGggPyBnbG9iYWxTcHJpdGVGcmFtZUFycl96aCA6IHRoaXMuc3ByaXRlRnJhbWVBcnJfemg7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsb2JhbFNwcml0ZUZyYW1lQXJyX2VuID0gd2luZG93Lmdsb2JhbERhdGFfNS5zcHJpdGVGcmFtZUFycl9lbiB8fCBbXTtcclxuICAgICAgICB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuID0gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4ubGVuZ3RoID8gZ2xvYmFsU3ByaXRlRnJhbWVBcnJfZW4gOiB0aGlzLnNwcml0ZUZyYW1lQXJyX2VuO1xyXG5cclxuICAgICAgICBjb25zdCBnbG9iYWxTcHJpdGVGcmFtZUFycl92biA9IHdpbmRvdy5nbG9iYWxEYXRhXzUuc3ByaXRlRnJhbWVBcnJfdm4gfHwgW107XHJcbiAgICAgICAgdGhpcy5zcHJpdGVGcmFtZUFycl92biA9IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuLmxlbmd0aCA/IGdsb2JhbFNwcml0ZUZyYW1lQXJyX3ZuIDogdGhpcy5zcHJpdGVGcmFtZUFycl92bjtcclxuXHJcbiAgICAgICAgbGV0IGxhbmd1YWdlID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZExhbmd1YWdlJykgfHwgTGFuZ3VhZ2UuRU47XHJcblxyXG4gICAgICAgIGxldCBsYW5ndWFnZU9iajogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHt9O1xyXG4gICAgICAgIHN3aXRjaCAobGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZS5aSDpcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlT2JqID0gdGhpcy56aExhbmd1YWdlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNwcml0ZUZyYW1lQXJyX3poLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVBcnJbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUZyYW1lQXJyX3poW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2UuVk46XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZU9iaiA9IHRoaXMuaW5MYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zcHJpdGVGcmFtZUFycl92bi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlQXJyW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVGcmFtZUFycl92bltpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlLkVOOlxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VPYmogPSB0aGlzLmVuTGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUFycltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlRnJhbWVBcnJfZW5baV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFiZWxBcnIuZm9yRWFjaCgobGFiZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGxhbmd1YWdlT2JqW2luZGV4XSB8fCAnJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=