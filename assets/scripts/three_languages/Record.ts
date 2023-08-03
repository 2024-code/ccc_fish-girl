import LobbyMain_lan from "./set_languages/LobbyMain_lan";

const { ccclass } = cc._decorator;

@ccclass
export default class Record extends cc.Component {

    /**
     * 存储当前按钮点了哪个语言
     */
    which_language(cur: any) {
        let language = cur.currentTarget.name;
        cc.sys.localStorage.setItem('selectedLanguage', language);
        LobbyMain_lan.Instance.setLanguage(); 
        console.log(language);
    }
}
