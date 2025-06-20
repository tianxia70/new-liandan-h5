import request from "@/request";

export const getCurrentProjectInfo = (params) => {
    return request({
        url: "projectInfoApp/getCurrentProjectInfo",
        method: "get",
        isLoading: true
    }, params)
};
export const apiLogin = (data) => {
    return request({
        url: "/api/user/login",
        method: "post",
        loading: true,
        data
    })
};
export const apiRegister = (data) => {
    return request({
        url: "/api/user/buyer/register",
        method: "post",
        loading: true,
        data
    })
};

// 未登录时候发送验证码
export const apiSendCodeNoneLogin = (data) => {
    return request({
        url: "/api/user/sendCaptchCodeNoneLogin",
        method: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
};


// 已登录用户发送验证码
export const apiSendCodeLogin = (data) => {
    return request({
        url: "/api/user/sendCaptchCode",
        method: "post",
        isLoading: true,
        data
    })
};

// 获取用户信息
export const apiUserInfo = (params) => {
    return request({
        url: "/api/user/current/get",
        method: "get",
        isLoading: true,
        params
    })
};

// 修改登录密码
export const apiUserModifyPwd = (data) => {
    return request({
        url: "/api/user/password",
        method: "post",
        isLoading: true,
        data
    })
};

// 设置资金密码
export const apiUserSetTransPwd = (data) => {
    return request({
        url: "/api/user/bindSecurityCode",
        method: "post",
        isLoading: true,
        data
    })
};

// 修改资金密码
export const apiUserModifyTransPwd = (data) => {
    return request({
        url: "/api/user/updateSecurityCode",
        method: "post",
        isLoading: true,
        data
    })
};


// 绑定邮箱or手机
export const apiUserCheckEmailOrPhone = (data) => {
    return request({
        url: "/api/user/checkEmailOrPhone",
        method: "post",
        loading: true,
        data
    })
};

// 获取系统协议
export const apiGetProtocol = (params) => {
    return request({
        url: "/api/user/protocol",
        method: "get",
        params
    })
};
// 