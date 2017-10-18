export function saveToLocal(id,key,value){
  let seller = window.localStorage.__seller__
  if(!seller){
    seller = {}
    seller[id] = {}
  }else{
    // localStorage中存储的是字符串，需要转化
    seller = JSON.parse(seller)
    if(!seller[id]){
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}

export function loadFormLocal(id,key,def){
  let seller = window.localStorage.__seller__
  if(!seller){
    // ref 默认值
    return def
  }
  seller = JSON.parse(seller)[id]
  if(!seller){
    return def
  }
  let ret = seller[key]
  return ret || def
}
