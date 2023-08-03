cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {}
    onClick(event,customEventData)
    {
        let instance = window.yadaxiao_ins;
        
        if (customEventData.indexOf('tobet_') == 0)
        {
            //
        }else{
            playEffect('Click');
        }

        if (customEventData == "close")
        {
            //var lobbyMainSocket = require('../Lobby/LobbyNetWork').socket;
            var ins = require("yadaxiaoNetWork").getInstant;
            ins.LandlordsSocket.disconnect();
            cc.director.loadScene("LobbyMain");
        }else if (customEventData == "sound")
        {

        }else if (customEventData == "detail")
        {
            instance.detailNode.active = true;
        }else if (customEventData == "online")
        {
            instance.onlineNode.active = true;
        }else if (customEventData == "record")
        {
            instance.recordNode.active = true;
        }else if (customEventData.indexOf('bet') == 0)
        {
            var b = customEventData.substring(3,customEventData.length);
            if (b == "all")
            {
                instance.selbet("all");
            }else{
                var b = parseInt(customEventData.substring(3,customEventData.length));
                instance.selbet(b*100);    
            }
        }
        else if (customEventData == "tobet_0")
        {
            instance.m_iSelTar = 0;
            instance.bet(0,event.touch._point);
        }else if (customEventData == "tobet_1")
        {
            instance.m_iSelTar = 1;
            instance.bet(1,event.touch._point);
        }else if (customEventData == "tobet_2")
        {
            instance.m_iSelTar = 2;
            instance.bet(2,event.touch._point);
        }else if (customEventData == "qiangzhuang")
        {
            instance.qiangzhuang();
        }else if (customEventData == "settinggold")
        {
            //instance.settinggoldNode.active = true;
            instance.setQiangGoldView();
        }else if (customEventData == "changegold")
        {
            var gold = cc.find('Canvas/抢庄UI/输入').getComponent(cc.EditBox).string;
            if (isNaN(gold))
            {
                instance.setQiangGoldView();
                return;
            }
            var num = parseInt(gold);
            if (num<100000 || num> 1000000)
            {
                instance.setQiangGoldView();
                return;
            }

            instance.m_iQiangNum = num;
            instance.setQiangGoldView();
            instance.settinggoldNode.active = false;
        }else if (customEventData == "changeclose")
        {
            instance.setQiangGoldView();
            instance.settinggoldNode.active = false;
        }

        else if (customEventData == "settingfast")
        {
            instance.setFastGoldView();
        }else if (customEventData == "changefast")
        {
            var gold = cc.find('Canvas/快压设置/输入').getComponent(cc.EditBox).string;
            if (isNaN(gold))
            {
                instance.setFastGoldView();
                return;
            }
            var num = parseInt(gold);
            if (num<=0 || num> instance.table_userinfo[0].score || num>1000)
            {
                instance.setFastGoldView();
                return;
            }

            instance.m_iFastNum = num;
            instance.setFastGoldView();
            instance.settingfastNode.active = false;
        }else if (customEventData == "changefastclose")
        {
            instance.setFastGoldView();
            instance.settingfastNode.active = false;
        }
    }
});
