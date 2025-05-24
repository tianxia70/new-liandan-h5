import request from "@/request";


// 返回纯USDT单位的金额数据
export const apiWalletGetUsdt = (data) => {
    return request({
        url: "/api/user/wallet/getUsdt",
        method: "post",
        data
    })
};

// 获取所有链地址
export const apiGetBlockChaneList = (data) => {
    return request({
        url: "/api/user/channelBlockchain/list",
        method: "post",
        data
    })
};

// 获取币种钱包
export const apiWalletList = (data) => {
    return request({
        url: "/api/user/wallet/list",
        method: "post",
        data
    })
};

// 钱包历史记录
export const apiWalletRecords = (data) => {
    return request({
        url: "/api/user/wallet/records",
        method: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
};


// 返回我的钱包信息，带币种单位
export const apiWalletGetMyWallet = (data) => {
    return request({
        url: "/api/user/wallet/getMyWallet",
        method: "post",
        data
    })
};

// 提取充值新价格
export const apiRechargeFee = (data) => {
    return request({
        url: "/api/user/recharge/fee",
        method: "post",
        // isLoading: true,
        data
    })
};

// 提取充值相关的限制配置信息
export const apiRechargeLimitConfig = (data) => {
    return request({
        url: "/api/user/recharge/rechargeLimitConfig",
        method: "post",
        // isLoading: true,
        data
    })
};


// 提取充值相关的限制配置信息
export const apiRechargeOpen = (data) => {
    return request({
        url: "/api/user/recharge/open",
        method: "post",
        // isLoading: true,
        data
    })
};

// 提取充值申请
export const apiRechargeApply = (data) => {
    return request({
        url: "/api/user/recharge/apply",
        method: "post",
        // isLoading: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
};

// 充值记录
export const apiRechargePagelist = (data) => {
    return request({
        url: "/api/user/recharge/pagelist",
        method: "post",
        // isLoading: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
};


// 提取提现相关的限制配置信息
export const apiWithdrawLimitConfig = (data) => {
    return request({
        url: "/api/user/withdraw/withdrawLimitConfig",
        method: "post",
        data
    })
};

// 提取提现新价格
export const apiWithdrawFee = (data) => {
    return request({
        url: "/api/user/withdraw/fee",
        method: "post",
        data
    })
};


// 提现记录
export const apiWithdrawPagelist = (data) => {
    return request({
        url: "/api/user/withdraw/pagelist",
        method: "post",
        data
    })
};

// 用户绑定提现地址
export const apiBindWithdrawAddress = (data) => {
    return request({
        url: "/api/user/bindWithdrawAddress",
        method: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
};

// 首次进入页面，传递session_token
export const apiWithdrawOpen = (data) => {
    return request({
        url: "/api/user/withdraw/withdrawOpen",
        method: "post",
        // isLoading: true,
        data
    })
};

// 提现申请
export const apiWithdrawApply = (data) => {
    return request({
        url: "/api/user/withdraw/apply",
        method: "post",
        // isLoading: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
};
