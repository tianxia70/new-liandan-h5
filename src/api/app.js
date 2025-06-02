import request from "@/request";


// 获取系统参数配置
/**
 * 
 * @param {*} params 
 * @returns 
 * GET请求：/api/user/syspara/getSyspara?code=xxxx ,传入code，多个逗号分割。
1、register_verify_email ：注册时是否验证邮箱
2、bind_cash_address：是否绑定提现地址
3、register_verify_phone：注册时是否验证手机
4、register_verify_captcha：注册时图形验证码验证
5、bind_identity 是否绑定身份认证
 */
export const apiGetSyspara = (codes = []) => {
    return request({
        url: "/api/user/syspara/getSyspara?code="+codes.join(','),
        method: "get"
    })
};


