function ajax(methods, url, async, parmas) {
  let res = function () {}
  const xhr = new XMLHttpRequest;
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // console.log(JSON.parse(xhr.responseText).data)
      res = JSON.parse(xhr.responseText).data
      // console.log(res)
    }
  }
  
  if (parmas) {
    xhr.open(methods, url + '?' + parmas, async)
  } else {
    xhr.open(methods, url, async)
  }
  xhr.send()

  // 返回数据
  return res
}