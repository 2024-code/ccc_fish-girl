const { ccclass, property } = cc._decorator;

enum Language {
    ZH = 'txt.zh',
    VN = 'txt.vn',
    EN = 'txt.en'
}

interface GlobalData_1 {
    labelArr: cc.Label[],
    spriteArr: cc.Sprite[],
    spriteFrameArr_zh: cc.SpriteFrame[],
    spriteFrameArr_en: cc.SpriteFrame[],
    spriteFrameArr_vn: cc.SpriteFrame[]
}

@ccclass
export default class ATTlianhuanpao_lan extends cc.Component {

    @property({ type: [cc.Label], tooltip: '替换的Label' })
    labelArr: cc.Label[] = [];

    @property({ type: [cc.Sprite], tooltip: '替换的Sprite' })
    spriteArr: cc.Sprite[] = [];

    @property({ type: [cc.SpriteFrame], tooltip: '替换的中文图片' })
    spriteFrameArr_zh: cc.SpriteFrame[] = [];

    @property({ type: [cc.SpriteFrame], tooltip: '替换的英文图片' })
    spriteFrameArr_en: cc.SpriteFrame[] = [];

    @property({ type: [cc.SpriteFrame], tooltip: '替换的印尼图片' })
    spriteFrameArr_vn: cc.SpriteFrame[] = [];

    @property({ type: cc.Button, tooltip: '开始按钮' })
    beginArr: cc.Button;

    @property({ type: [cc.SpriteFrame], tooltip: '开始的Sprite中文贴图' })
    beginSpriteArr_zh: cc.SpriteFrame[] = [];
    @property({ type: [cc.SpriteFrame], tooltip: '开始的Sprite英文贴图' })
    beginSpriteArr_en: cc.SpriteFrame[] = [];
    @property({ type: [cc.SpriteFrame], tooltip: '开始的Sprite印尼贴图' })
    beginSpriteArr_vn: cc.SpriteFrame[] = [];


    zhLanguage: { [key: number]: string } = {
        0: '点击下注',
        1: '退出',
        2: '点击下注'
    };

    enLanguage: { [key: number]: string } = {
        0: 'Click to bet ',
        1: 'Quit ',
        2: 'Click to bet'
    };

    inLanguage: { [key: number]: string } = {
        0: 'klik dan bertaruh',
        1: 'keluar ',
        2: 'Klik untuk bertaruh'
    };

    protected start(): void {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_1) {
            window.globalData_1 = {} as GlobalData_1;
        }
        window.globalData_1.labelArr = this.labelArr;
        window.globalData_1.spriteArr = this.spriteArr;
        window.globalData_1.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_1.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_1.spriteFrameArr_vn = this.spriteFrameArr_vn;

        this.setLanguage();
    }

    private setLanguage(): void {
        const persistNode = cc.director.getScene().getChildByName('init_language');
        const yourScriptComponent = persistNode.getComponent('ATTlianhuanpao_lan');

        const globalLabelArr = window.globalData_1.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;

        const globalSpriteArr = window.globalData_1.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;

        const globalSpriteFrameArr_zh = window.globalData_1.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;

        const globalSpriteFrameArr_en = window.globalData_1.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;

        const globalSpriteFrameArr_vn = window.globalData_1.spriteFrameArr_vn || [];
        this.spriteFrameArr_vn = globalSpriteFrameArr_vn.length ? globalSpriteFrameArr_vn : this.spriteFrameArr_vn;
        let language = cc.sys.localStorage.getItem('selectedLanguage') || Language.EN;

        let languageObj: { [key: number]: string } = {};
        switch (language) {
            case Language.ZH:
                languageObj = this.zhLanguage;
                for (let i = 0; i < this.spriteFrameArr_zh.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_zh[i];
                }

                this.beginArr.normalSprite = this.beginSpriteArr_zh[0];
                this.beginArr.pressedSprite = this.beginSpriteArr_zh[1];
                this.beginArr.hoverSprite = this.beginSpriteArr_zh[0];
                this.beginArr.disabledSprite = this.beginSpriteArr_zh[1];
                break;
            case Language.VN:
                languageObj = this.inLanguage;
                for (let i = 0; i < this.spriteFrameArr_vn.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_vn[i];
                }

                this.beginArr.normalSprite = this.beginSpriteArr_vn[0];
                this.beginArr.pressedSprite = this.beginSpriteArr_vn[1];
                this.beginArr.hoverSprite = this.beginSpriteArr_vn[0];
                this.beginArr.disabledSprite = this.beginSpriteArr_vn[1];
                break;
            case Language.EN:
                languageObj = this.enLanguage;
                for (let i = 0; i < this.spriteFrameArr_en.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_en[i];
                }

                this.beginArr.normalSprite = this.beginSpriteArr_en[0];
                this.beginArr.pressedSprite = this.beginSpriteArr_en[1];
                this.beginArr.hoverSprite = this.beginSpriteArr_en[0];
                this.beginArr.disabledSprite = this.beginSpriteArr_en[1];
                break;
        }

        this.labelArr.forEach((label, index) => {
            label.string = languageObj[index] || '';
        });
    }
}
