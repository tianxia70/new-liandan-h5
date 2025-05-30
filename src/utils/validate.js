// 手机验证
export function validatePhone(phone) {
  const regexList = [
    /^[0-9]{5,20}$/,
    /^1[3-9]\d{9}$/, // 中国大陆
    /^[569]\d{7,8}$/, // 中国香港
    /^1\d{9}$/, // 美国
    /^\+(?:[0-9]●?){6,14}[0-9]$/ // 国际通用
  ];
  return regexList.some(regex => regex.test(phone));
}

// 邮箱验证
export function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}


