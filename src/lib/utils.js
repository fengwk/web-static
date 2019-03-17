/**
 * 对象克隆
 * 
 * @param {Object} obj
 */
function clone(origin) {
  let _className = function(o) {
    if(o === null) return "Null";
    if(o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
  }
  let result, oClass = _className(origin);
  //确定result的类型
  if(oClass === "Object") {
    result = {};
  } else if(oClass === "Array") {
    result = [];
  } else {
    return origin;
  }
  for(let key in origin) {
    let copy = origin[key];
    if(_className(copy) == "Object" || _className(copy) == "Array") {
      result[key] = clone(copy); //递归调用
    } else {
      result[key] = origin[key];
    }
  }
  return result;
}

/**
 * 复制文本到剪切板
 *
 * @param text
 */
function copyToClipboard (text) {
  let temp = document.createElement('input');
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("Copy");
  temp.remove();
}

export {
	clone,
  copyToClipboard
}
