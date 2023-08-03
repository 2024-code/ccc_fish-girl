cc.Class({
    extends: cc.Component,

    properties: {
        poker_arr:    [cc.Node],

        chip_box:   cc.Node,
        bet_text:   cc.Node,
        bet_text_qiang:   cc.Node,
        player_node:   [cc.Node],
        helpNode:   cc.Node,
        onlineNode: cc.Node,
        recordNode: cc.Node,

        animeNode_pk:   cc.Node,
        animeNode_start:    cc.Node,
        animeNode_end:  cc.Node, 
        animeNode_wait:  cc.Node,

        chips_node:     cc.Node,

        cardspframe:    [cc.SpriteFrame],
        headspframe:    [cc.SpriteFrame],
        resultspframe:    [cc.SpriteFrame],
        resultspframe0:    [cc.SpriteFrame],

        pointspframe:   [cc.SpriteFrame],

        chip_prefab:[cc.Prefab],
        m_iCurrentSelBet:-1,

        m_iGameOverTime:-1,
        m_lPoolNum:[],

        m_iSelTar:-1,

        // userInfo_list:[],
        // farseer:{},
        table_userinfo:[],

        m_iQiangNum:100000,

        m_iFastNum:1,

        detailNode :cc.Node,
        settinggoldNode :cc.Node,
        settingfastNode :cc.Node,
        qiangNode:cc.Node,

        recordContent : cc.Node,
        recordPrefab : cc.Prefab,

        point_node:   [cc.Node],
        no_bet_node:    [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    serializeUsers(user_object)
    {
        //0自己 1神算 2首富 3-6其他
        //bet_score
        //score
        //user_id
        //user_name
        //user_url
        //win_num

        this.farseer = user_object.shen_suan_zi;
        this.userInfo_list = user_object.ranking_list;
        if (this.table_userinfo .length == 0){
            
            var playerInfo = require("PlayerInfo").getInstant;
            var playerInfoEx = window.bairenniuniu_sc;
            var info_0 = {
                score: playerInfoEx.score,
                user_id: playerInfoEx.id,
                user_name: playerInfoEx.nickname,
                user_url: playerInfoEx.headimgurl};
            this.table_userinfo.push(info_0);
        }else{
            this.table_userinfo.splice(1,this.table_userinfo.length-1);
        }
        

        if (JSON.stringify(user_object.shen_suan_zi) != "{}")
        {
            this.table_userinfo.push(user_object.shen_suan_zi);
        }else
        {
            var info_x = {
                score: "",
                user_id: -1,
                user_name: "空缺",
                user_url: -1};
            this.table_userinfo.push(info_x);
        }

        for (var i in user_object.ranking_list)
        {
            var info = user_object.ranking_list[i];
            if (info.user_id == this.table_userinfo[1].user_id && parseInt(i)!=0)
                continue;
            if (info.user_id == this.table_userinfo[0].user_id && parseInt(i)!=0)
                continue;


            this.table_userinfo.push(info);
            if (this.table_userinfo.length>=7)
                break;
        }

        for (var i = this.table_userinfo.length; i<7 ;i++)
        {
            var info_x = {
                score: "",
                user_id: -1,
                user_name: "空缺",
                user_url: -1};
            this.table_userinfo.push(info_x);
        }

        this.setPlayerView();
    },

    onLoad () {

        this.chip_name = {100:"bt_score_0_0",
        1000:"bt_score_1_0",
        5000:"bt_score_2_0",
        10000:"bt_score_3_0",
        50000:"bt_score_4_0"};
        this.chip_nums = [100,1000,5000,10000,50000];    
        cc.debug.setDisplayStats(false);
        window.brnn_ins = this;
        var playerInfo = require("PlayerInfo").getInstant;
        var playerInfoEx = window.bairenniuniu_sc;
        this.playerId = playerInfoEx.id;
        this.player_score = playerInfoEx.score;
        this.player_name = playerInfo.playerName;
        this.playerHead = playerInfo.playerHead;
        this.playerHeadId = playerInfo.playerHeadId;

        this.m_lPoolNum =[-1,0,0,0,0];
        this.serializeUsers(window.bairenniuniu_global.userInfo_list);


        this.poker_pos = [];
        for (var i in this.poker_arr)
        {
            this.poker_pos[i] = this.poker_arr[i].position;
            this.poker_pos[i].opacity = 0;
        }
        

        this.resetparam();
        this.network = require('bairenniuniuNetWork').getInstant;
        this.bet_text.active = false;
        this.bet_text_qiang.active = false;

        for (var i in this.no_bet_node)
        {
            this.no_bet_node[i].active = false;
        }

        this.setPokerVisible(false);

        this.network.LandlordsSocket.emit('getGameType', '');
        this.network.LandlordsSocket.emit("getGameRecordList","");
        this.animeNode_wait.active = true;
    },

    start () {
        playBGM('bg');
    },

    init_record(result){

        var arr = this.recordNode.getChildByName('im_ludan_bg').getChildByName('jilu_list').children;

        for (var i in arr)//= arr.length-1;i>=0;i--)
        {
            var node = arr[i];
            var index = result.length-arr.length +parseInt(i);
            console.log(index);
            if (index<0){
                node.active = false;
            }else{
                node.active = true;
                for (var j in node.children)
                {
                    var item = node.children[j];
                    if (result[index].win[j]>0)
                    {
                        item.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[0];
                    }else{
                        item.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[1];
                    }
                }
            }
        }

        // var arr = this.node.getChildByName("ld_bg").children;

        // for (var i in arr)
        // {
        //     arr[i].getChildByName('jg_he').active = false;
        //     arr[i].getChildByName('jg_da').active = false;
        // }
        // for (var i = result.length-1;i>=0;i--)
        // {
        //     var res = result[i].win;
        //     var num = arr.length-1 - (result.length-1 - parseInt(i));
        //     if (num<0)break;
        //     var node = arr[num].getChildByName('jg_da');
        //     node.active = true;
        //     node.getComponent(cc.Sprite).spriteFrame = this.resultspframe[res];

        //     var node0 = arr[num].getChildByName('jg_he');
        //     node0.active = true;
        //     if (result[i].zhuangscore>0)
        //     {
        //         node0.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[0];
        //     }else if (result[i].zhuangscore<0)
        //     {
        //         node0.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[1];
        //     }else{
        //         node0.getComponent(cc.Sprite).spriteFrame = this.resultspframe0[2];
        //     }

        // }
        // this.init_record2(result);
    },

    to_double(num){
        if (num<10) return '0'+num;
        return num;
    },

    init_record2(result){
        this.recordContent.removeAllChildren();
        for (var i = result.length-1;i>=0;i--)
        {
            var res = result[i].win;
            var open = result[i].open_time;
            var node = cc.instantiate(this.recordPrefab);
            node.parent = this.recordContent;

            var res_ = ''
            let date = new Date(open) ; 
            res_ =  date.getFullYear()+'/'+this.to_double(date.getMonth()+1)+"/"+this.to_double(date.getDate())+' '+this.to_double(date.getHours())+":"+this.to_double(date.getMinutes())+":"+this.to_double(date.getSeconds());

            node.getChildByName('txt').getComponent(cc.Label).string = res_;//new Date(open).toLocaleString();
            node.getChildByName('bao').active = false;
            node.getChildByName('da').active = false;
            node.getChildByName('xiao').active = false;
            if (res == 0){
                node.getChildByName('bao').active = true;
            }else if (res == 1){
                node.getChildByName('da').active = true;
            }else if (res == 2){
                node.getChildByName('xiao').active = true;
            }
        }
    },
    
    init_stat(result){
        if (result.game_type == 1)
        {
            // if (result.bet_time == 30)
            // {
            //     this.betBegin();
            // }else
            {
                this.bet_text.active = true;
                this.m_iGameOverTime = Date.now()/1000+result.bet_time;
                this.animeNode_wait.active = false;
            }
            this.setPokerVisible(true);

            for (var i in this.no_bet_node)
            {
                this.no_bet_node[i].active = true;
            }
        }else 
        {
            //this.node.getChildByName("当前状态文本").active = true;
            // for (var i in this.poker_arr)
            // {
            //     this.poker_arr[i].opacity = 0;
            // }
        }

        if (result.game_type == 4)
        {
            this.qiangNode.active = true;
            this.bet_text_qiang.active = true;
            this.m_iGameOverTime = Date.now()/1000+result.qiang_time;
        }else{
            this.qiangNode.active = false;
        }

        for (var i in result.bet_list)
        {
            this.m_lPoolNum[result.bet_list[i].bet_res] += result.bet_list[i].bet_gold;
        }
        this.setPoolView();
    },

    setPoolView()
    {
        // for (var i =0;i<3;i++)
        // {
        //     this.node.getChildByName("main").getChildByName("chip_bg_"+i).getChildByName("pool").getComponent(cc.Label).string = this.m_lPoolNum[i];    
        // }

        cc.find('Canvas/im_game_bg/games_btn_tian_normal/luckyStar/xiazhu_gold').getComponent(cc.Label).string = Helper.fixNum(this.m_lPoolNum[1]);
        cc.find('Canvas/im_game_bg/games_btn_di_normal/luckyStar/xiazhu_gold').getComponent(cc.Label).string = Helper.fixNum(this.m_lPoolNum[2]);
        cc.find('Canvas/im_game_bg/games_btn_xuan_normal/luckyStar/xiazhu_gold').getComponent(cc.Label).string = Helper.fixNum(this.m_lPoolNum[3]);
        cc.find('Canvas/im_game_bg/games_btn_huang_normal/luckyStar/xiazhu_gold').getComponent(cc.Label).string = Helper.fixNum(this.m_lPoolNum[4]);
        
    },

    update(dt){
        if (this.m_iGameOverTime && this.bet_text.active)
        {
            var t = parseInt(this.m_iGameOverTime - Date.now()/1000);

            if (t<=5 && t+"" != this.bet_text.getChildByName('New Label').getComponent(cc.Label).string)
            {
                playEffect('countdown');
                if (t == 0)
                {
                    playEffect('stop_s');
                    this.animeNode_end.active = true;
                    this.animeNode_end.stopAllActions();
                    this.animeNode_end.runAction(cc.sequence(cc.show(),cc.delayTime(1.2),cc.hide()));
                }
            }

            if (t<=0) {
                this.bet_text.active = false;
                return;
            }
            this.bet_text.getChildByName('New Label').getComponent(cc.Label).string = t;
            //this.bet_text_down.getChildByName('New Label').getComponent(cc.Label).string = t;
        }


        if (this.m_iGameOverTime && this.bet_text_qiang.active)
        {
            var t = parseInt(this.m_iGameOverTime - Date.now()/1000);

            if (t<=0) {
                this.bet_text_qiang.active = false;
                return;
            }
            this.bet_text_qiang.getChildByName('New Label').getComponent(cc.Label).string = t;
            //this.bet_text_down.getChildByName('New Label').getComponent(cc.Label).string = t;
        }


    },

    resetparam()
    {
        this.m_iCurrentSelBet = -1;
        this.setBetView();
        this.setPlayerView();
    },

    bet(num,point)
    {
        this.lastTouchPoint = point;
        if (this.m_iCurrentSelBet == -1)
        {
            return;
        }

        var  str = JSON.stringify({
            //bet_type: 1,
            bet_res: parseInt(num),
            bet_gold: this.m_iCurrentSelBet,
        });

        this.network.LandlordsSocket.emit('lottery', str);

        this.setBetView();
    },

    selbet(para){
        if (para == "all")
        {
            if (this.m_iSelTar<0)
            {
                this.showHint('请先选择一次大小');
                return;    
            }else{
                this.lastTouchPoint = cc.v2(0,0);
                var  str = JSON.stringify({
                    //bet_type: 1,
                    bet_res: this.m_iSelTar,
                    bet_gold: this.m_iFastNum*100,
                });
        
                this.network.LandlordsSocket.emit('lottery', str);
            }
        }
        var num = parseInt(para);
        if (this.m_iCurrentSelBet == num)
        {
            this.m_iCurrentSelBet = -1;
        }else{
            if (this.table_userinfo[0].score < num)
            {
                return;
            }
            playEffect('chip');
            this.m_iCurrentSelBet = num;
        }
        this.setBetView();
    },
    setBetView()
    {
        if (this.m_iCurrentSelBet > this.table_userinfo[0].score)
        {
            this.m_iCurrentSelBet = -1;
        }
        var betarray = this.chip_box.children;
        for (var i in betarray)
        {
            var node = betarray[i];

            if (this.chip_nums[i] <= this.table_userinfo[0].score)
            {
                node.opacity = 255;
            }else{
                node.opacity = 128;
            }

            if (this.chip_nums[i] == this.m_iCurrentSelBet)
            {
                node.getChildByName('checkmark').active = true;
            }else{
                node.getChildByName('checkmark').active = false;
            }
        }
    },

    setPlayerView()
    {
        // this.node.getChildByName('ui').getChildByName("head").getChildByName("金币icon").getChildByName("金币数").getComponent(cc.Label).string = Helper.fixNum(this.table_userinfo[0].score);
        // this.node.getChildByName('ui').getChildByName("head").getChildByName("玩家名").getComponent(cc.Label).string = this.table_userinfo[0].user_name;
        // this.node.getChildByName('ui').getChildByName("head").getChildByName("ID").getComponent(cc.Label).string = "ID:" + this.table_userinfo[0].user_id;
        // setHeadTexture(this.node.getChildByName('ui').getChildByName('head'),this.table_userinfo[0].user_url);

        for (var i in this.player_node)
        {
            var tag = parseInt(i);
            var info;
            if (tag >= this.table_userinfo.length)
            {
                //info = {};
                break;
            }else{
                info = this.table_userinfo[tag];
            }
            this.player_node[tag].getChildByName("name").getComponent(cc.Label).string = info.user_name;
            if (this.player_node[tag].getChildByName("gold_bar"))
                this.player_node[tag].getChildByName("gold_bar").getChildByName("gold").getComponent(cc.Label).string = Helper.fixNum(info.score);

            var head = info.user_url;
            var headnode = this.player_node[tag];
            if (head < 0)
            {
                head = 0;
                return;
            }    
            if (headnode.getChildByName("user_zhuangjia"))
            {
                headnode = headnode.getChildByName("user_zhuangjia");
            }
            //headnode.getComponent(cc.Sprite).spriteFrame = this.headspframe[head];
            setHeadTexture(headnode,head);
        }
    },

    showCount(score)
    {
        var node = this.node.getChildByName("结果");
        node.active = true;
        var label_0 = node.getChildByName("label_0").getComponent(cc.Label);
        
        if (score>0)
        {
            label_0.string = "您赢得了 "+Helper.fixNum(score);
        }else if (score<0)
        {
            label_0.string = "您输掉了 "+Helper.fixNum(-1*score);
        }else{
            label_0.string = "您没有输赢";
        }
        
        var label_1 = node.getChildByName("label_1").getComponent(cc.Label);
        label_1.string = "当前 " + Helper.fixNum(this.table_userinfo[0].score);

    },
    showResult(ret)
    {
        let instance = this;
        //012 龙虎和 1234 黑红花片
        //var sam = {hu_card:2307,long_card:258,ResultCode:1,win:1};

        this.table_userinfo[0].score += ret.user_win;

        //var score_change = this.table_userinfo[0].score - this.player_score;

        // this.scheduleOnce(function(){
        //     this.showCount(score_change);
        // },4.0);

        this.player_score = this.table_userinfo[0].score;

        var per_time = 1;
        var needtime = 1.5; 

        //ret.win_res[0];
        //ret.win;
 

        this.scheduleOnce(function(){
            for (var i = 0;i<5;i++)
            {
                this.setPokerSp(0,i,ret.cards[0][i]);
            }
        },per_time);

        this.scheduleOnce(function(){

            for (var j = 1;j<5;j++)
            {
                for (var i = 0;i<5;i++)
                {
                    this.setPokerSp(j,i,ret.cards[j][i]);
                }
            }
            this.setPointView(0,ret.niu_ji_list[0]);
        },per_time*2);

        this.scheduleOnce(function(){

            for (var j = 1;j<5;j++)
            {
                this.setPointView(j,ret.niu_ji_list[j]);
            }

            
        },per_time*3);

            this.scheduleOnce(function(){  
                var arr = this.chips_node.children;
                for (var i in arr)
                {
                    var chip_node = arr[i];
                    if (chip_node.on_pool == ret.win)
                    {
                        var inited = false;
                        var endpos;
                        if (chip_node.owner == this.playerId)
                        {
                            inited = true;
                            endpos = cc.v2(693,61);
                        }
                        if (inited)
                        {
                            chip_node.runAction(cc.sequence(cc.moveTo(0.25,endpos),cc.removeSelf()));
                        }else{
                            chip_node.runAction(cc.sequence(cc.fadeOut(0.25),cc.removeSelf()));
                        }
                    }else{
                        chip_node.runAction(cc.sequence(cc.fadeOut(0.2),cc.removeSelf()));
                    }
                }
            },per_time*5);

            this.scheduleOnce(function (dt) {
                this.setPlayerView(0);
                if (ret.user_win>0)
                {
                    playEffect('ADD_SCORE');
                }

                this.network.LandlordsSocket.emit("getGameRecordList","");
            },per_time*5+0.2);

            this.scheduleOnce(function (dt) {

                instance.setPokerVisible(false);
                //instance.node.getChildByName("当前状态文本").active = true;
                
                instance.m_lPoolNum = [-1,0,0,0,0];

                instance.setPoolView();
                for (var i in this.no_bet_node)
                {
                    this.no_bet_node[i].active = false;
                }
                this.animeNode_wait.active = true;

            },per_time*10+0.8);
    },

    onBet(info){
        // info.bet_res;
        // info.bet_gold;
        // info.userId;

        playEffect('choumaxiazhu');
        this.m_lPoolNum[info.bet_res] += info.bet_gold;
        this.setPoolView();

        var chip_startpos;
        
        var chip_endpos;

        var inited = false;

        var endnode ;
        if (info.bet_res == 1)
        {
            endnode = cc.find('Canvas/im_game_bg/games_btn_tian_normal');
        }else if (info.bet_res == 2){
            endnode = cc.find('Canvas/im_game_bg/games_btn_di_normal');
        }else if (info.bet_res == 3){
            endnode = cc.find('Canvas/im_game_bg/games_btn_xuan_normal');
        }else if (info.bet_res == 4){
            endnode = cc.find('Canvas/im_game_bg/games_btn_huang_normal');
        }

        var ownerTag = -1;
        for (var i in this.table_userinfo)
        {
            if (this.table_userinfo[i].user_id+"" == info.userId+"")
            {
                ownerTag = parseInt(i);
                break;
            }
        }

        for (var i in this.table_userinfo)
        {
            if (this.table_userinfo[i].user_id+"" == info.userId+"")
            {
                this.table_userinfo[i].score -= info.bet_gold;
            }
        }
        this.setPlayerView();

        if (ownerTag == 0)
        {
            //this.player_score -= info.bet_gold;
            this.no_bet_node[info.bet_res-1].active =false;
            inited = true;

            var index = 0;
            for (var i = this.chip_nums.length-1;i>=0;i--)
            {
                if (this.chip_nums[i] <= info.bet_gold)
                {
                    index = i;
                    break;
                }
            }


            chip_startpos = this.chip_box.getChildByName(this.chip_name[this.chip_nums[index]]).convertToWorldSpaceAR(cc.v2(0, 0));
            
            //var endpos_mid = endnode.getChildByName('mid').convertToWorldSpaceAR(cc.v2(0, 0));
            var endpos_min = endnode.getChildByName('min').convertToWorldSpace(cc.v2(0, 0));
            var endpos_max = endnode.getChildByName('max').convertToWorldSpace(cc.v2(0, 0));

            if (this.lastTouchPoint.x >=endpos_min.x && this.lastTouchPoint.y >=endpos_min.y
                && this.lastTouchPoint.x <=endpos_max.x && this.lastTouchPoint.y <=endpos_max.y)
            {
                var endx = this.lastTouchPoint.x + Math.floor(Math.random()*60)-30;
                var endy = this.lastTouchPoint.y + Math.floor(Math.random()*60)-30;
            }else{
                var endx = Math.floor(Math.random()*(endpos_max.x-endpos_min.x)) + endpos_min.x;
                var endy = Math.floor(Math.random()*(endpos_max.y-endpos_min.y)) + endpos_min.y;
            }

            chip_endpos = cc.v2(endx,endy);

        }
        // else if (ownerTag!= -1)
        // {

        // }
        else
        {
            inited = true;

            //var endpos_mid = endnode.getChildByName('mid').convertToWorldSpaceAR(cc.v2(0, 0));
            var endpos_min = endnode.getChildByName('min').convertToWorldSpaceAR(cc.v2(0, 0));
            var endpos_max = endnode.getChildByName('max').convertToWorldSpaceAR(cc.v2(0, 0));


            var endx = Math.floor(Math.random()*(endpos_max.x-endpos_min.x)) + endpos_min.x;
            var endy = Math.floor(Math.random()*(endpos_max.y-endpos_min.y)) + endpos_min.y;

            chip_endpos = cc.v2(endx,endy);

            chip_startpos = chip_endpos;

        }

        if (inited)
        {
            var index = 0;
            for (var i = this.chip_nums.length-1;i>=0;i--)
            {
                if (this.chip_nums[i] <= info.bet_gold)
                {
                    index = i;
                    break;
                }
            }
            //this.chip_nums.indexOf(info.bet_gold)
            var chip_node = cc.instantiate(this.chip_prefab[index]);
            chip_node.x = chip_startpos.x;
            chip_node.y = chip_startpos.y;
            chip_node.scale = 0.4;
            chip_node.parent = this.chips_node;
            chip_node.runAction(cc.moveTo(0.25,chip_endpos.x,chip_endpos.y));

            chip_node.owner = info.userId;
            chip_node.on_pool = info.bet_res;
        }
    },

    betBegin()
    {
        //this.network.LandlordsSocket.emit("getGameRankingList","");
        this.betBegin_r();
    },

    betBegin_r()
    {

        this.animeNode_wait.active = false;
        //var node = this.node.getChildByName("结果");
        //node.active = false;
        playEffect('start_s');
        this.m_lPoolNum = [-1,0,0,0,0];
        this.setPoolView();

        this.qiangNode.active = false;
        //this.node.getChildByName("当前状态文本").active = false;
        this.m_iGameOverTime = Date.now()/1000+15;

        let instance = this;
        //var ske = this.node.getChildByName('lhdpk');
        // ske.getComponent(sp.Skeleton).setCompleteListener(function () {
        //     ske.active = false;
            instance.setPokerVisible(true);

            // var start = instance.node.getChildByName('anim_start');
            // start.getComponent(sp.Skeleton).setCompleteListener(function () {

                var start = instance.animeNode_start;
                start.active = true;
                this.scheduleOnce(function (dt) {

                    start.active = false;
                    instance.bet_text.active = true;
                },1.0);
                

            // });
            // start.active = true;

        // });
        // ske.active = true;

        for (var i in this.no_bet_node)
        {
            this.no_bet_node[i].active = true;
        }
    },

    setPokerSp(tag,tag_0,num)
    {
        var node = this.poker_arr[tag].children[tag_0];

        if (num<0)
        {
            node.getComponent(cc.Sprite).spriteFrame = this.cardspframe[52];
        }else{
            // var a1 = parseInt(num/16)/16;
            // var b1 = num%16;
            // var i = (b1-1)*13 +(a1-1);
            var i = num-1;
            node.runAction(cc.sequence(cc.scaleTo(0.25,1.2,1.2),cc.scaleTo(0.25,0,1.2)));
            this.scheduleOnce(function(){
                node.getComponent(cc.Sprite).spriteFrame = this.cardspframe[i];
                node.runAction(cc.sequence(cc.scaleTo(0.25,1.2,1.2),cc.scaleTo(0.25,1,1)));
            },0.5);
        }
},

    setPokerVisible(flag)
    {
        var t = 0.15;
        if (flag)
        {
            playEffect('SEND_CARD');
        }

        for (var i in this.poker_arr)
        {
            this.poker_arr[i].active = flag;
            for (var j in this.poker_arr[i].children)
            {
                this.setPokerSp(i,j,-1);
            }
        }

        for (var i = 0;i<5;i++){
            this.setPointView(i,-99);
        }
    },

    setPointView(tag,num){
        if (num ==-99){
            this.point_node[tag].parent.active = false;
        }else{
            if (num == -1) num = 0;
            else if (num == 0) num =10;
            this.point_node[tag].parent.active = true;
            this.point_node[tag].getComponent(cc.Sprite).spriteFrame = this.resultspframe[num];
        }
    },

    qiangzhuang()
    {
        this.network.LandlordsSocket.emit('qiangZhuang', '');
    },

    setQiangGoldView()
    {
        this.settinggoldNode.active = true;
        cc.find('Canvas/抢庄UI/输入').getComponent(cc.EditBox).string = this.m_iQiangNum;
    },


    setFastGoldView()
    {
        this.settingfastNode.active = true;
        cc.find('Canvas/快压设置/输入').getComponent(cc.EditBox).string = this.m_iFastNum;
    },

    showHint(str)
    {
        var node = this.node.getChildByName('hint');
        node.active = true;
        node.stopAllActions();

        node.opacity = 0;
        node.getChildByName("label").getComponent(cc.Label).string = str;
        node.runAction(cc.sequence(cc.fadeIn(0.4),cc.delayTime(1.2),cc.fadeOut(0.4)));
    },
    setzhuang(ret)
    {
        this.node.getChildByName('zhuang_bg').active = true;
        this.node.getChildByName('face_m').active = true;
        this.node.getChildByName('icon_zhuang').active = true;
        this.node.getChildByName('zhuang_bg').getChildByName('庄家name').getComponent(cc.Label).string = ret.name;
        setHeadTexture(this.node.getChildByName('face_m'),ret.url);
    },
});


