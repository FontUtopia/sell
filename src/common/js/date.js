export function formatDate(date, fmt){
  //加了小括号，表示子表达式-----正则表达式中每个小括号内的部分表达式就是一个子表达式。
  if(/(y+)/.test(fmt)){
    // RegExp.$1...$9属性用于返回正则表达式模式中某个子表达式匹配的文本
    // substr(4-RegExp.$1.length)－－－例如如果只想获取2016的16
    fmt = fmt.replace(RegExp.$1,date.getFullYear()+''.substr(4-RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDay(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1,RegExp.$1.length===1?str:padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str){
  return ('00'+str).substr(str.length)
}