const { ccclass, property } = cc._decorator;

enum Language {
    ZH = 'txt.zh',
    VN = 'txt.vn',
    EN = 'txt.en'
}

@ccclass
export default class LobbyMain_lan extends cc.Component {

    public static Instance: LobbyMain_lan = null as unknown as LobbyMain_lan;

    @property({ type: [cc.Label], tooltip: '替换的Label' })
    labelArr: cc.Label[] = [];

    zhLanguage: { [key: number]: string } = {
        0: '手机号注册',
        1: '手机号',
        2: '验证码',
        3: '确认密码',
        4: '输入手机号',
        5: '输入验证码',
        6: '输入密码',
        7: '注册',
        8: '发送验证码',
        9: '手机号',
        10: '请输入手机号',
        11: '密码',
        12: '请输入密码',
        13: '注册',
        14: '游客登录',
        15: '登录',
        16: '手机号',
        17: '验证码',
        18: '确认密码',
        19:'活动',
    };

    enLanguage: { [key: number]: string } = {
        0: 'Mobile number registration ',
        1: 'Mobile number ',
        2: 'Verification code ',
        3: 'Confirm password ',
        4: 'Enter the phone number ',
        5: 'Enter the verification code ',
        6: 'Enter password ',
        7: 'Register ',
        8: 'Send verification code ',
        9: 'Mobile number ',
        10: 'Please enter mobile number ',
        11: 'Password ',
        12: 'Please enter password ',
        13: 'Register ',
        14: 'Visitor login ',
        15: 'Login',
        16: 'Mobile number ',
        17: 'Verification code ',
        18: 'Confirm password',
        19:' Activity '
    };

    inLanguage: { [key: number]: string } = {
        0: 'plat nomor mobil ',
        1: 'nomor ponsel ',
        2: 'kode verifikasi ',
        3: 'konfirmasi sandi ',
        4: 'masukkan nomor telepon ',
        5: 'masukkan kode verifikasi ',
        6: 'masukkan sandi ',
        7: 'Register ',
        8: 'kirim kode verifikasi ',
        9: 'nomor ponsel ',
        10: 'silakan masukkan nomor ponsel ',
        11: 'sandi ',
        12: 'masukkan kata sandi ',
        13: 'Register ',
        14: 'log masuk pengunjung ',
        15: 'log masuk',
        16: 'nomor ponsel ',
        17: 'kode verifikasi ',
        18: 'konfirmasi sandi',
    };

    protected start(): void {
        if (LobbyMain_lan.Instance === null) {
            LobbyMain_lan.Instance = this;
        } else {
            this.destroy();
            return;
        }
        this.setLanguage();
    }

    public setLanguage(): void {
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