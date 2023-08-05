const { ccclass, property } = cc._decorator;

enum Language {
    ZH = 'txt.zh',
    VN = 'txt.vn',
    EN = 'txt.en'
}

interface GlobalData_2 {
    labelArr: cc.Label[],
    spriteArr: cc.Sprite[],
    spriteFrameArr_zh: cc.SpriteFrame[],
    spriteFrameArr_en: cc.SpriteFrame[],
    spriteFrameArr_vn: cc.SpriteFrame[]
}

@ccclass
export default class BaijialeGameLan extends cc.Component {

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


    zhLanguage: { [key: number]: string } = {
        0: '点',
        1: '点',
        2: '富豪',
        3: '神算子',
        4: '规则',
        5: '请下住'
    };

    enLanguage: { [key: number]: string } = {
        0: 'POINT',
        1: 'POINT',
        2: 'RICH',
        3: 'GodOperator',
        4: 'RULE',
        5: ' Please stay down '
    };

    inLanguage: { [key: number]: string } = {
        0: 'titik ',
        1: 'titik ',
        2: 'kaya ',
        3: 'GodOperator',
        4: 'aturan ',
        5: 'tolong jangan bangun'
    };

   
    protected start(): void {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_2) {
            window.globalData_2 = {} as GlobalData_2;
        }
        window.globalData_2.labelArr = this.labelArr;
        window.globalData_2.spriteArr = this.spriteArr;
        window.globalData_2.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_2.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_2.spriteFrameArr_vn = this.spriteFrameArr_vn;

        this.setLanguage();
    }

    private setLanguage(): void {
        const persistNode = cc.director.getScene().getChildByName('init_language');
        const yourScriptComponent = persistNode.getComponent('BaijialeGameLan');

        const globalLabelArr = window.globalData_2.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;

        const globalSpriteArr = window.globalData_2.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;

        const globalSpriteFrameArr_zh = window.globalData_2.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;

        const globalSpriteFrameArr_en = window.globalData_2.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;

        const globalSpriteFrameArr_vn = window.globalData_2.spriteFrameArr_vn || [];
        this.spriteFrameArr_vn = globalSpriteFrameArr_vn.length ? globalSpriteFrameArr_vn : this.spriteFrameArr_vn;
        let language = cc.sys.localStorage.getItem('selectedLanguage') || Language.EN;

        let languageObj: { [key: number]: string } = {};
        switch (language) {
            case Language.ZH:
                languageObj = this.zhLanguage;
                for (let i = 0; i < this.spriteFrameArr_zh.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_zh[i];
                }
                break;
            case Language.VN:
                languageObj = this.inLanguage;
                for (let i = 0; i < this.spriteFrameArr_vn.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_vn[i];
                }
                break;
            case Language.EN:
                languageObj = this.enLanguage;
                for (let i = 0; i < this.spriteFrameArr_en.length; i++) {
                    this.spriteArr[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrameArr_en[i];
                }
                break;
        }

        this.labelArr.forEach((label, index) => {
            label.string = languageObj[index] || '';
        });
    }
}