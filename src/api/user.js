import request from "@/request";

export const uploadImg = (file) => {
    const formData = new FormData();// 通过formdata上传
    formData.append('file', file);
    if(file?.name) {
        const extname = file.name.split('.')[1]
        const fileName = new Date().getTime() + '.' + extname
        formData.append('moduleName', fileName); 
    }
    return request({
        url: "/api/user/uploadimg",
        method: "post",
        isLoading: true,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
};

// 更新用户图标
export const apiUserRefreshAvatar = (data) => {
    return request({
        url: "/api/user/refreshAvatar",
        method: "post",
        isLoading: true,
        data
    })
};


// 
export const apiUserAboutUs = (params) => {
    return request({
        url: "/api/user/aboutUs",
        method: "get",
        isLoading: true,
        params
    })
};

// vip列表
export const apiUserLevelList = (params) => {
    return request({
        url: "/api/user/level/list",
        method: "get",
        isLoading: true,
        params
    })
};

// vip购买
export const apiUserLevelBuy = (params) => {
    return request({
        url: "/api/user/level/buy",
        method: "post",
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // },
        params
    })
};


// 资金记录列表
export const apiUserMoneyLogList = (params) => {
    return request({
        url: "/api/user/pageListMoneyLog",
        method: "get",
        params
    })
};

// 我的推广
export const apiUserFindUserInfo = (data) => {
    return request({
        url: "/api/user/promote/findUserInfo",
        method: "post",
        data
    })
};

// 获取实名信息
export const apiUserKycInfo = (params) => {
    return request({
        url: "/api/user/kyc/get",
        method: "get",
        params
    })
};

// 用户认证申请
export const apiUserKycApply = (data) => {
    return request({
        url: "/api/user/kyc/apply",
        method: "post",
        data
    })
};

// 连单首页工具列表
export const apiUserHomePageList = (data) => {
    return request({
        url: "/api/user/home/page/list",
        method: "post",
        data
    })
};

// 连单首页商品列表
export const apiUserGoodsList = (params) => {
    return request({
        url: "/api/user/goods/list",
        method: "get",
        params
    })
};

// 获取未读站内信数量
export const apiNotifiyUnread = (params) => {
    return request({
        url: "/api/user/notification/unreadCount",
        method: "get",
        params
    })
};

// 获取站内信列表
export const apiNotifiyList = (params) => {
    return request({
        url: "/api/user/notification/pagelistMessage",
        method: "get",
        params
    })
};

// 站内信-批量已读
export const apiNotifiyRead = (params) => {
    return request({
        url: "/api/user/notification/read?ids="+ params.ids,
        method: "post",
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // },
        // params
    })
};
