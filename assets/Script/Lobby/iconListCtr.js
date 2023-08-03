// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        qipai_childArr : [cc.Node],
        dianwan_childArr : [cc.Node],
        laohuji_childArr : [cc.Node],
    },

    // onLoad () {},

    start () {

    },

    setAllChildDisplay(isShow){
        for (const iterator of this.node.children) {
            iterator.active = isShow;
        }
    },

    onToggleClick(toggle, cus) {
        console.log("点击切换按钮",cus);
        
        switch (cus) {
            case "all":
                this.setAllChildDisplay(true);
                break;
            case "qipai":
                this.setAllChildDisplay(false);
                for (const iterator of this.qipai_childArr) {
                    iterator.active = true;
                }
                break;
            case "dianwan":
                this.setAllChildDisplay(false);
                for (const iterator of this.dianwan_childArr) {
                    iterator.active = true;
                }
                break;
            case "laohuji":
                this.setAllChildDisplay(false);
                for (const iterator of this.laohuji_childArr) {
                    iterator.active = true;
                }
                break;

            default:
                break;
        }
    },

    // update (dt) {},
});
