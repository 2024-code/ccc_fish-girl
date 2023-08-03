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

    zhLanguage: { [key: number]: string } = {
        0: '点',
        1: '点',
        2: '富豪',
        3: '神算子',
        4: '规则'
    };

    enLanguage: { [key: number]: string } = {
        0: 'POINT',
        1: 'POINT',
        2: 'RICH',
        3: 'GodOperator',
        4: 'RULE'
    };
    
    inLanguage: { [key: number]: string } = {
        0: 'titik',
        1: 'pluviosity',
        2: 'pembuat firman',
        3: 'aturan'
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