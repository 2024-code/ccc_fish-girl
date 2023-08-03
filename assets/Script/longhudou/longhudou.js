window.lhd_global = {};
cc.Class({
    extends: cc.Component,

    properties: {
        poker_0:    cc.Node,
        poker_1:    cc.Node,
        chip_box:   cc.Node,
        bet_text:   cc.Node,
        player_node:   [cc.Node],
        helpNode:   cc.Node,
        onlineNode: cc.Node,
        recordNode: cc.Node,

        animeNode_pk:   cc.Node,
        animeNode_start:    cc.Node,
        animeNode_end:  cc.Node,

        chips_node:     cc.Node,

        cardspframe:    [cc.SpriteFrame],
        //headspframe:    [cc.SpriteFrame],
        resultspframe:    [cc.SpriteFrame],

        chip_prefab:[cc.Prefab],
        m_iCurrentSelBet:-1,

        m_iGameOverTime:-1,
        m_lPoolNum:[],

        // userInfo_list:[],
        // farseer:{},
        table_userinfo:[],
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

        // this.farseer = user_object.shen_suan_zi;
        // this.userInfo_list = user_object.ranking_list;
        if (this.table_userinfo .length == 0){
            
            var playerInfo = require("PlayerInfo").getInstant;
            var playerInfoEx = window.lhd_sc;
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
        this.chip_name = {100:"chip_green",1000:"chip_blue",5000:"chip_purple",10000:"chip_red",50000:"chip_yellow"};
        this.chip_nums = [100,1000,5000,10000,50000];    
        cc.debug.setDisplayStats(false);
        window.longhudou_ins = this;
        var playerInfo = require("PlayerInfo").getInstant;
        var playerInfoEx = window.lhd_sc;
        this.playerId = playerInfoEx.id;
        //this.player_score = playerInfoEx.score;
        this.player_name = playerInfo.playerName;
        this.playerHead = playerInfo.playerHead;
        this.playerHeadId = playerInfo.playerHeadId;

        this.m_lPoolNum =[0,0,0];
        this.serializeUsers(window.lhd_global.userInfo_list);

        this.resetparam();
        this.network = require('longhudouNetWork').getInstant;
        this.bet_text.active = false;

        this.network.LandlordsSocket.emit('getGameType', '');
        this.network.LandlordsSocket.emit("getGameRecordList","");
    },

    start () {
        playBGM('bg');
    },

    init_record(result){
        var arr = this.node.getChildByName("trend_box").getChildByName("ludan_20").children;
        for (var i = result.length-1;i>=0;i--)
        {
            var res = result[i].win;
            var num = arr.length-1 - (result.length-1 - parseInt(i));
            if (num<0)break;
            var node = arr[num];

            node.getComponent(cc.Sprite).spriteFrame = this.resultspframe[res];
        }
    },

    init_stat(result){
        if (result.game_type == 1)
        {
            // if (result.bet_time == 15)
            // {
            //     this.betBegin();
            // }else
            {
                this.bet_text.active = true;
                this.m_iGameOverTime = Date.now()/1000+result.bet_time;
            }
            this.node.getChildByName("anim_wait").active = false;
        }else 
        {
            this.node.getChildByName("anim_wait").active = true;
        }

        for (var i in result.bet_list)
        {
            this.m_lPoolNum[result.bet_list[i].bet_res] = result.bet_list[i].bet_gold;
        }
        this.setPoolView();
    },

    setPoolView()
    {
        for (var i =0;i<3;i++)
        {
            this.node.getChildByName("main").getChildByName("chip_bg_"+i).getChildByName("pool").getComponent(cc.Label).string = Helper.fixNum(this.m_lPoolNum[i]);    
        }
        
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
                }
            }

            if (t<=0) {
                this.bet_text.active = false;
                return;
            }
            this.bet_text.getChildByName('New Label').getComponent(cc.Label).string = t;
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

    selbet(num){
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
                node.getChildByName('chip_select').active = true;
            }else{
                node.getChildByName('chip_select').active = false;
            }
        }
    },

    setPlayerView()
    {
        for (var i in this.player_node)
        {
            var tag = parseInt(i);
            var info;
            if (tag >= this.table_userinfo.length)
            {
                info = {};
            }else{
                info = this.table_userinfo[tag];
            }
            this.player_node[tag].getChildByName("New Label").getComponent(cc.Label).string = info.user_name;
            if (this.player_node[tag].getChildByName("pl_gold_bar"))
                this.player_node[tag].getChildByName("pl_gold_bar").getChildByName("New Label").getComponent(cc.Label).string = Helper.fixNum(info.score);

            var head = info.user_url;
            var headnode = this.player_node[tag];
            if (head < 0)
            {
                head = 0;
            }    
            if (headnode.getChildByName("pl_face"))
            {
                headnode = headnode.getChildByName("pl_face");
            }
            //headnode.getComponent(cc.Sprite).spriteFrame = this.headspframe[head];
            window.setHeadTexture(headnode,head);
        }
    },

    showResult(ret)
    {
        let instance = this;
        //012 龙虎和 1234 黑红花片
        //var sam = {hu_card:2307,long_card:258,ResultCode:1,win:1};

        //this.player_score
        this.table_userinfo[0].score += ret.user_win;

        this.setPokerSp(0,ret.long_card);
        this.scheduleOnce(function(){
            this.setPokerSp(1,ret.hu_card);
            this.scheduleOnce(function(){
                var winarea = this.node.getChildByName('main').getChildByName('winner_area_'+ret.win);
                winarea.opacity = 0;
                winarea.active = true;
                winarea.runAction(cc.sequence(cc.fadeIn(0.4),cc.fadeOut(0.4),cc.fadeIn(0.4),cc.fadeOut(0.4) ));    
            },0.8);

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
            },1.2);

            this.scheduleOnce(function(){
                if (ret.win == 0){
                    playEffect('long_win');
                }else if (ret.win == 1){
                    playEffect('hu_win');                    
                }else if (ret.win == 2){
                    playEffect('he');
                }
            },1.6);

            this.scheduleOnce(function (dt) {
                this.setPlayerView(0);
                if (ret.user_win>0)
                {
                    playEffect('ADD_SCORE');
                }

                this.network.LandlordsSocket.emit("getGameRecordList","");
            },1.9);

            this.scheduleOnce(function (dt) {
                instance.setPokerVisible(false);
                instance.node.getChildByName("anim_wait").active = true;
                
                instance.m_lPoolNum = [0,0,0];
                instance.setPoolView();
            },2.3);
        },0.8);
        
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

        var endnode;
        if (info.bet_res == 0){
            endnode = this.node.getChildByName('main').getChildByName('Dragon_betting_area');
        }else if (info.bet_res == 1){
            endnode = this.node.getChildByName('main').getChildByName('Tiger_betting_area');
        }else if (info.bet_res == 2){
            endnode = this.node.getChildByName('main').getChildByName('Draw_betting_area');
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
            inited = true;

            chip_startpos = this.chip_box.getChildByName(this.chip_name[info.bet_gold]).convertToWorldSpaceAR(cc.v2(0, 0));
            
            //var endpos_mid = endnode.getChildByName('mid').convertToWorldSpaceAR(cc.v2(0, 0));
            var endpos_min = endnode.getChildByName('min').convertToWorldSpaceAR(cc.v2(0, 0));
            var endpos_max = endnode.getChildByName('max').convertToWorldSpaceAR(cc.v2(0, 0));

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
            var chip_node = cc.instantiate(this.chip_prefab[this.chip_nums.indexOf(info.bet_gold)]);
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
        this.network.LandlordsSocket.emit("getGameRankingList","");
    },

    betBegin_r()
    {
        playEffect('start_s');
        this.m_lPoolNum = [0,0,0];
        this.setPoolView();

        this.node.getChildByName("anim_wait").active = false;
        this.m_iGameOverTime = Date.now()/1000+15;

        let instance = this;
        var ske = this.node.getChildByName('lhdpk');
        ske.getComponent(sp.Skeleton).setCompleteListener(function () {
            ske.active = false;
            instance.setPokerVisible(true);

            var start = instance.node.getChildByName('anim_start');
            start.getComponent(sp.Skeleton).setCompleteListener(function () {
                start.active = false;
            });
            instance.bet_text.active = true;
            start.active = true;

        });
        ske.active = true;
    },

    setPokerSp(tag,num)
    {
        var node;
        if (tag == 0) node = this.poker_0;
        if (tag == 1) node = this.poker_1;
        if (num<0)
        {
            node.getComponent(cc.Sprite).spriteFrame = this.cardspframe[52];
        }else{
            var a1 = parseInt(num/16)/16;
            var b1 = num%16;
            var i = (b1-1)*13 +(a1-1);
            node.runAction(cc.sequence(cc.scaleTo(0.25,1.2,1.2),cc.scaleTo(0.25,0,1.2)));
            this.scheduleOnce(function(){
                node.getComponent(cc.Sprite).spriteFrame = this.cardspframe[i];
                node.runAction(cc.sequence(cc.scaleTo(0.25,1.2,1.2),cc.scaleTo(0.25,1,1)));
            },0.5);

            this.scheduleOnce(function(){
                playEffect('lhb_p_'+a1);
            },1);

        }
},

    setPokerVisible(flag)
    {
        var t = 0.15;
        if (!flag)
        {
            this.poker_0.runAction(cc.spawn(cc.moveTo(t,cc.v2(-88-60,258+120)),cc.fadeOut(t)));
            this.scheduleOnce(function (dt) {
                //this.setPokerSp(0,-1);
                this.poker_0.x = -88;
                this.poker_0.y = 258;
                this.poker_0.opacity = 0;
            },t+0.8);
            this.poker_1.runAction(cc.spawn(cc.moveTo(t,cc.v2(84-60,258+120)),cc.fadeOut(t)));
            this.scheduleOnce(function (dt) {
                //this.setPokerSp(0,-1);
                this.poker_1.x = 84;
                this.poker_1.y = 258;
                this.poker_1.opacity = 0;
            },t+0.8);
        }else{
            playEffect('SEND_CARD');
            this.setPokerSp(0,-1);
            this.poker_0.opacity = 0;
            this.poker_0.x = -88+60;
            this.poker_0.y = 258+120;
            this.poker_0.runAction(cc.spawn(cc.moveTo(t,cc.v2(-88,258)),cc.fadeIn(t)));
            
            this.scheduleOnce(function(){
                playEffect('SEND_CARD');
                this.setPokerSp(1,-1);
                this.poker_1.opacity = 0;
                this.poker_1.x = 84 - 60;
                this.poker_1.y = 258 + 120;
                this.poker_1.runAction(cc.spawn(cc.moveTo(t,cc.v2(84,258)),cc.fadeIn(t)));        
            },t);
        }
    }
});
