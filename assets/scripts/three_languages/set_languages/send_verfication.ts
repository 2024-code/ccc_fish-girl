const { ccclass, property } = cc._decorator;

@ccclass
export default class send_verfication extends cc.Component {
    @property({ type: cc.Label, tooltip: '顾客手机号' })
    cur_phone: cc.Label;

    @property({ type: cc.Label, tooltip: '顾客给的验证码' })
    cur_verficat: cc.Label;

    @property({ type: cc.Label, tooltip: '验证码按钮显示倒计时' })
    verficat_but: cc.Label;

    private countdownRunning: boolean = false; // 倒计时是否正在进行中
    private isRegistered: boolean = false;

    /**
     * 60秒倒计时
     */
    countdown() {
        if (this.countdownRunning) {
            return; // 如果倒计时正在进行中，则直接返回，不执行倒计时逻辑
        }

        this.countdownRunning = true; // 将倒计时标记为正在进行中

        let count = 60;
        const labelComponent = this.verficat_but;

        const intervalId = setInterval(() => {
            if (count === 1) {
                labelComponent.string = '发送手机验证码';
                clearInterval(intervalId);

                // 模拟向服务器发送请求获取验证码
                const phoneNumber = this.cur_phone.string;
                this.sendVerificationCodeRequest(phoneNumber)
                    .then((verificationCode) => {
                        // 验证码校验
                        const isValidVerification = verificationCode === this.cur_verficat.string;
                        if (isValidVerification) {
                            // 验证码正确
                            console.log('验证码正确');
                            this.isRegistered = true;
                        } else {
                            // 验证码错误
                            console.log('验证码错误');
                            this.isRegistered = false;
                        }

                        this.countdownRunning = false; // 倒计时结束，标记为非进行中
                    })
                    .catch((error) => {
                        console.error('发送验证码请求出错:', error);
                        this.isRegistered = false; // 请求出错，将注册状态标记为false
                        this.countdownRunning = false; // 倒计时结束，标记为非进行中
                    });

                return;
            }

            labelComponent.string = String(count);
            count--;
        }, 1000);
    }


    // 模拟向服务器发送请求获取验证码的方法
    sendVerificationCodeRequest(phoneNumber: string): Promise<string> {
        // 这里模拟一个异步请求，使用Promise来模拟请求的异步性质
        return new Promise<string>((resolve, reject) => {
            // 这里可以执行向服务器发送请求的逻辑，比如使用axios库发送POST请求
            // 实际情况需要替换为真实的请求逻辑
            setTimeout(() => {
                const verificationCode = "123456"; // 这里简单返回一个固定的验证码示例
                resolve(verificationCode); // 请求成功，将验证码传递给回调函数
            }, 2000); // 这里使用setTimeout模拟异步请求的延迟时间
        });
    }

    ReturnRegistered() {
        return this.isRegistered;
    }
}
