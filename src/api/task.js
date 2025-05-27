import request from "@/request";


// start页面数据
export const apiOrderStartData = (params) => {
    return request({
        url: "/api/user/order/brush/start-index",
        method: "get",
        params
    })
};



// start页面抢单前置校验
export const apiOrderStartPre = (params) => {
    return request({
        url: "/api/user/order/brush/start-pre",
        method: "get",
        loading: true,
        params
    })
};

// start页面抢单接口
export const apiOrderStartBrush = (data) => {
    return request({
        url: "/api/user/order/brush/start-brush",
        method: "post",
        loading: true,
        data
    })
};

// 支付订单
export const apiOrderStartPay = (data) => {
    return request({
        url: "/api/user/order/brush/start-pay",
        method: "post",
        data
    })
};


// 任务订单
export const apiOrderBrushList = (params) => {
    return request({
        url: "/api/user/order/brush/list-brush",
        method: "get",
        params
    })
};
