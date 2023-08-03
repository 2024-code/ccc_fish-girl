const { ccclass, property } = cc._decorator;

enum Language {
    ZH = 'txt.zh',
    VN = 'txt.vn',
    EN = 'txt.en'
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
        this.setLanguage();
    }

    private setLanguage(): void {
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
