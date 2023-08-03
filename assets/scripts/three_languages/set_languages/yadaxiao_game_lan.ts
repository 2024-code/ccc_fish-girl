const { ccclass, property } = cc._decorator;

enum Language {
    ZH = 'txt.zh',
    VN = 'txt.vn',
    EN = 'txt.en'
}

@ccclass
export default class yadaxiao_game_lan extends cc.Component {

    @property({ type: [cc.Label], tooltip: '替换的Label' })
    labelArr: cc.Label[] = [];

    zhLanguage: { [key: number]: string } = {
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

    enLanguage: { [key: number]: string } = {
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

    inLanguage: { [key: number]: string } = {
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
