const { ccclass, property } = cc._decorator;

enum Language {
    ZH = 'txt.zh',
    VN = 'txt.vn',
    EN = 'txt.en'
}
interface GlobalData_6 {
    labelArr: cc.Label[],
    spriteArr: cc.Sprite[],
    spriteFrameArr_zh: cc.SpriteFrame[],
    spriteFrameArr_en: cc.SpriteFrame[],
    spriteFrameArr_vn: cc.SpriteFrame[]
}
@ccclass
export default class HotUpdate_lan extends cc.Component {

    @property({ type: [cc.Label], tooltip: '替换的Label' })
    labelArr: cc.Label[] = [];

    zhLanguage: { [key: number]: string } = {
        0: '确定',
        1: '提示',
        2: '确定',
        3: '游戏版本过低，更新失败。/d 请下载最新版本',
        4: '确认',
        5: '当前版本过低，请前往更新'
    };

    enLanguage: { [key: number]: string } = {
        0: 'OK ',
        1: 'Prompt ',
        2: 'OK ',
        3: 'The game version is too low, the update failed. /d Please download the latest version ',
        4: 'Confirm ',
        5: 'The current version is too low, please go to update ',
    };

    inLanguage: { [key: number]: string } = {
        0: 'OK ',
        1: 'cepat ',
        2: 'OK ',
        3: 'versi permainannya terlalu rendah, perbaruannya gagal. /d tolong download versi terbaru ',
        4: 'konfirmasi ',
        5: 'versi saat ini terlalu rendah, silakan beralih ke pemutakhiran ',
    };

    protected start(): void {
        // 将需要保留的属性赋值给全局对象
        if (!window.globalData_6) {
            window.globalData_6 = {} as GlobalData_6;
        }
        window.globalData_6.labelArr = this.labelArr;
        window.globalData_6.spriteArr = this.spriteArr;
        window.globalData_6.spriteFrameArr_zh = this.spriteFrameArr_zh;
        window.globalData_6.spriteFrameArr_en = this.spriteFrameArr_en;
        window.globalData_6.spriteFrameArr_vn = this.spriteFrameArr_vn;

        this.setLanguage();
    }

    private setLanguage(): void {
        const persistNode = cc.director.getScene().getChildByName('init_language');
        const yourScriptComponent = persistNode.getComponent('HotUpdate_lan');

        const globalLabelArr = window.globalData_6.labelArr || [];
        this.labelArr = globalLabelArr.length ? globalLabelArr : this.labelArr;

        const globalSpriteArr = window.globalData_6.spriteArr || [];
        this.spriteArr = globalSpriteArr.length ? globalSpriteArr : this.spriteArr;

        const globalSpriteFrameArr_zh = window.globalData_6.spriteFrameArr_zh || [];
        this.spriteFrameArr_zh = globalSpriteFrameArr_zh.length ? globalSpriteFrameArr_zh : this.spriteFrameArr_zh;

        const globalSpriteFrameArr_en = window.globalData_6.spriteFrameArr_en || [];
        this.spriteFrameArr_en = globalSpriteFrameArr_en.length ? globalSpriteFrameArr_en : this.spriteFrameArr_en;

        const globalSpriteFrameArr_vn = window.globalData_6.spriteFrameArr_vn || [];
        this.spriteFrameArr_vn = globalSpriteFrameArr_vn.length ? globalSpriteFrameArr_vn : this.spriteFrameArr_vn;

        let language = cc.sys.localStorage.getItem('selectedLanguage') || Language.EN;

        let languageObj: { [key: number]: string } = {};
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

        this.labelArr.forEach((label, index) => {
            label.string = languageObj[index] || '';
        });
    }
}
