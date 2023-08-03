const { ccclass, property } = cc._decorator;

enum Language {
    ZH = 'txt.zh',
    VN = 'txt.vn',
    EN = 'txt.en'
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
        this.setLanguage();
    }

    private setLanguage(): void {
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