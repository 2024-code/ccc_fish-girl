const { ccclass } = cc._decorator;

@ccclass
export default class Record extends cc.Component {

    /**
     * 存储当前按钮点了哪个语言
     */
    which_language(cur: any) {
        let language = cur.currentTarget.name;
        cc.sys.localStorage.setItem('selectedLanguage', language);
        console.log(language);
    }
}
