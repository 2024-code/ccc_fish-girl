const Russian_Roulette_Red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]; //红
const Russian_Roulette_Black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]; //黑

cc.Class({
    extends: cc.Component,

    properties: {
        usrName: cc.Label,
        usrScore: cc.Label,
        usrIdLbl: cc.Label,
        usrHead: cc.Sprite,
        showView: cc.Node,
        SpList: cc.SpriteAtlas,
        betPb: cc.Prefab,
        historyList: [cc.Node],
        timerLbl: cc.Label,
        waitUI: cc.Node,
        startBetNode: cc.Node,
        stopBetNode: cc.Node,
        resultNode: cc.Node,
        ballNode: cc.Node,
        ballPrNode: cc.Node,
        wheelNode: cc.Node,
        winNode: cc.Node,
        showGoldNode: cc.Node,
        angleNode: cc.Node,

    },


    onLoad() {
        // 初始化变量
        this.selChip = '1'; //选择的筹码
        this.betPool = null; //筹码结点池
        this.historyResult = []; //历史5局结果
        this.allowBet = false; //是否允许下注
        this.betHistory = []; // 上局下注历史
        //加载固定体统
        this.playerInfo = require("PlayerInfo").getInstant;
        this.playerInfo.setGameObj_Function(this);
        this.netWork = require("RouletteNet").getInstant;
        this.netWork.setLobbyMainObj_Function(this);
        this.netWork.roulette = this;
    },

    start() {
        // this.startWheel(16);
        // return;

        this.betPool = new cc.NodePool();
        for (let i = 0; i < 100; i++) {
            let nd = cc.instantiate(this.betPb);
            this.betPool.put(nd);
        }
        Helper.loadHead(this.playerInfo.playerHeadId, res => {
            this.usrHead.spriteFrame = res;
        })
        this.waitUI.active = true;
        this.usrIdLbl.string = this.playerInfo.playerId;
        this.usrName.string = this.playerInfo.playerName;
        this.usrScore.string = (this.playerInfo.playerCoin / 100).toFixed(2);
        this.showHistory(this.netWork.history);
    },


    //开始下注
    startBet() {
        this.waitUI.active = false;
        this.timerLbl.string = '30';
        this.startBetNode.active = true;
        this.allowBet = true;
        this.schedule(() => {
            let tm = parseInt(this.timerLbl.string, 10);
            this.timerLbl.string = tm - 1;
            if (tm === 30) {
                this.startBetNode.active = false;
            } else if (tm === 2) {
                this.stopBetNode.active = true;
            } else if (tm === 1) {
                this.stopBetNode.active = false;
            }
        }, 1, 29);
    },

    getBetPb() {
        if (this.betPool.size() <= 0) {
            let nd = cc.instantiate(this.betPb);
            this.betPool.put(nd);
        }
        return this.betPool.get();
    },

    //选择筹码
    onSelChip(e, args) {
        this.selChip = e.node._name.substring(6);
        console.log('选择筹码' + this.selChip);
    },

    onCheckNum(e, args) {
        console.log(args);
        let pos = cc.v2(e.currentTarget.x, e.currentTarget.y);
        if (args == '0') {
            pos.x += Math.random() * 25;
            pos.y += Math.random() * 150 - 75;
        }
        args = [parseInt(args, 0), ];
        if (!!this.selChip && this.allowBet) {
            this.netWork.lotteryEmit(6, parseInt(this.selChip, 10), pos, args);
        }
    },

    onCheckDouble(e, args) {
        console.log(args);
        let pos = cc.v2(e.currentTarget.x, e.currentTarget.y);
        args = args.split(',');
        for (let i in args) {
            args[i] = parseInt(args[i]);
        }
        if (!!this.selChip && this.allowBet) {
            this.netWork.lotteryEmit(args[0] == 0 ? 7 : 5, parseInt(this.selChip, 10), pos, args);
        }
    },

    onCheckThree(e, args) {
        console.log(args);
        let pos = cc.v2(e.currentTarget.x, e.currentTarget.y);
        args = args.split(',');
        for (let i in args) {
            args[i] = parseInt(args[i]);
        }
        if (!!this.selChip && this.allowBet) {
            this.netWork.lotteryEmit(args[0] == 0 ? 7 : 4, parseInt(this.selChip, 10), pos, args);
        }
    },

    onCheckFour(e, args) {
        console.log(args);
        let pos = cc.v2(e.currentTarget.x, e.currentTarget.y);
        args = args.split(',');
        for (let i in args) {
            args[i] = parseInt(args[i]);
        }
        if (!!this.selChip && this.allowBet) {
            this.netWork.lotteryEmit(args[0] == 0 ? 7 : 3, parseInt(this.selChip, 10), pos, args);
        }
    },

    onCheckSix(e, args) {
        console.log(args);
        let pos = cc.v2(e.currentTarget.x, e.currentTarget.y);
        args = args.split(',');
        for (let i in args) {
            args[i] = parseInt(args[i]);
        }
        if (!!this.selChip && this.allowBet) {
            this.netWork.lotteryEmit(2, parseInt(this.selChip, 10), pos, args);
        }
    },

    onCheckSpecial(e, args) {
        let pos = cc.v2(e.currentTarget.x, e.currentTarget.y);
        let type = 1;
        let res = 0;
        switch (args) {
            //2:1
            case '1000':
                type = 1;
                res = 3;
                pos.x += Math.random() * 50 - 25;
                pos.y += Math.random() * 50 - 25;
                break;
            case '1001':
                type = 1;
                res = 4;
                pos.x += Math.random() * 50 - 25;
                pos.y += Math.random() * 50 - 25;
                break;
            case '1002':
                type = 1;
                res = 5;
                pos.x += Math.random() * 50 - 25;
                pos.y += Math.random() * 50 - 25;
                break;
            case '2000':
                // 1-12
                type = 1;
                res = 0;
                pos.x += Math.random() * 300 - 150;
                pos.y += Math.random() * 50 - 25;
                break;
            case '2001':
                //13-24
                type = 1;
                res = 1;
                pos.x += Math.random() * 300 - 150;
                pos.y += Math.random() * 50 - 25;
                break;
            case '2002':
                //25-36
                type = 1;
                res = 2;
                pos.x += Math.random() * 300 - 150;
                pos.y += Math.random() * 50 - 25;
                break;
            case '3000':
                //1-18
                type = 0;
                res = 0;
                pos.x += Math.random() * 150 - 75;
                pos.y += Math.random() * 50 - 25;
                break;
            case '3001':
                //偶数
                type = 0;
                res = 5;
                pos.x += Math.random() * 150 - 75;
                pos.y += Math.random() * 50 - 25;
                break;
            case '3002':
                //red
                type = 0;
                res = 2;
                pos.x += Math.random() * 150 - 75;
                pos.y += Math.random() * 50 - 25;
                break;
            case '3003':
                //black
                type = 0;
                res = 3;
                pos.x += Math.random() * 150 - 75;
                pos.y += Math.random() * 50 - 25;
                break;
            case '3004':
                //奇数
                type = 0;
                res = 4;
                pos.x += Math.random() * 150 - 75;
                pos.y += Math.random() * 50 - 25;
                break;
            case '3005':
                //19-36
                type = 0;
                res = 1;
                pos.x += Math.random() * 150 - 75;
                pos.y += Math.random() * 50 - 25;
                break;

        }
        if (!!this.selChip && this.allowBet) {
            this.netWork.lotteryEmit(type, parseInt(this.selChip, 10), pos, res);
        }
    },

    //下注表现
    bet(pos, chip) {
        const nameList = {
            '100': 's_chip_00',
            '500': 's_chip_01',
            '1000': 's_chip_02',
            '2500': 's_chip_03',
            '5000': 's_chip_04',
            '10000': 's_chip_05',
        };
        let nd = this.getBetPb();
        nd.getChildByName('betLbl').getComponent(cc.Label).string = parseInt(chip / 100);
        nd.getChildByName('betSp').getComponent(cc.Sprite).spriteFrame = this.SpList.getSpriteFrame(nameList[chip]);
        this.showView.addChild(nd);
        nd.position = pos;
        nd.scale = 0.5;
    },

    //清理注
    clearBet() {
        this.waitUI.active = true;
        let children = this.showView.children;
        let nList = [...children];
        for (let i in nList) {
            this.betPool.put(nList[i]);
        }
        this.resultNode.active = false;
        this.showGoldNode.active = false;
    },

    onClickExit(e, args) {
        this.netWork.rouletteSocket.disconnect();
        cc.director.loadScene("LobbyMain");
    },

    //续押
    reBet(e, args) {

    },

    startWheel(num) {
        let offestAngle = parseInt(Math.random() + 360 + 1);
        let angle = this.angleNode.getChildByName('' + num).rotation;
        this.wheelNode.rotation = 0;
        this.ballPrNode.rotation = 0;
        this.ballNode.position = cc.v2(-375, 0);
        this.wheelNode.runAction(cc.rotateTo(3, 360 * 3 + offestAngle).easing(cc.easeSineOut(3)));
        this.ballNode.runAction(cc.sequence(cc.delayTime(1), cc.moveTo(2, cc.v2(-260, 0))));
        let targetRotation = 90 - 360 * 4 + angle - offestAngle + 1;
        this.ballPrNode.runAction(cc.rotateTo(3, targetRotation).easing(cc.easeSineOut(3)));
    },

    showResult(number, winGold, myGold, hsitory) {
        let resultBd = this.resultNode.getChildByName('结果显示');
        this.scheduleOnce(() => {
            this.waitUI.active = false;
            this.resultNode.active = true;
            resultBd.active = false;
            this.startWheel(number);
        }, 1);
        this.scheduleOnce(() => {
            this.usrScore.string = (myGold / 100).toFixed(2);
            resultBd.active = true;
            resultBd.getChildByName('s_result_green').active = number == 0;
            resultBd.getChildByName('s_result_red').active = !!Russian_Roulette_Red.includes(number)
            let bs = number >= 19 ? '大' : '小';
            resultBd.getChildByName('大小').getComponent(cc.Label).string = number == 0 ? '0' : bs;
            resultBd.getChildByName('单双').getComponent(cc.Label).string = number % 2 == 0 ? '双' : '单';
            resultBd.getChildByName('数字').getComponent(cc.Label).string = number;
            resultBd.getChildByName('您赢得').active = winGold > 0;
            resultBd.getChildByName('无中奖').active = winGold <= 0;
            resultBd.getChildByName('您赢得').getChildByName('str').getComponent(cc.Label).string = winGold > 0 ? (winGold / 100).toFixed(2) : '';
            this.showHistory(hsitory);
        }, 10);
        this.scheduleOnce(() => {
            this.clearBet();
        }, 20)
    },

    showHistory(arrList) {
        let arr = [...arrList.reverse()];
        while (arr.length < 5) {
            arr.push('');
        }
        for (let i in arr) {
            this.historyList[i].getChildByName('green').active = arr[i] === 0;
            this.historyList[i].getChildByName('red').active = Russian_Roulette_Red.includes(arr[i]);
            this.historyList[i].getChildByName('number').getComponent(cc.Label).string = arr[i];
        }
    }
});