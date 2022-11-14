
// 获取首页内容区域 元素 id
let mainHome = document.getElementById('mainHome')
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    const data = JSON.parse(xhr.response)
    console.log(data)
    if (data.code === '200') {
      // 将结果渲染到页面
      // 创建一个p标签 用来最上方日期时间
      let topDate = document.createElement('p');

      const obsTime = getYMDHMS(data.now.obsTime)
      // console.log(data.now.obsTime)
      topDate.innerHTML = obsTime;
      mainHome.appendChild(topDate)

      // 创建一个div，用来中间部分展示 icon  温度  和 是不是晴天
      // 结构  div>div * 2 > img / p * 2
      let iconAndTemp = document.createElement('div');
      iconAndTemp.className = 'home-center'
      iconAndTemp.innerHTML = `
                <div>
                  <i class="qi-${data.now.icon}"></i>
                  </div>
                <div>
                  <p>${data.now.temp}℃</p>
                  <p>${data.now.text}</p>
                </div>
          `
      mainHome.appendChild(iconAndTemp)

      // 创建div 用来展示底部内容
      // 结构  div> 遍历div > p*2
      let bottomList = document.createElement('div')
      bottomList.className = 'bottom-box'
      bottomList.innerHTML = `
            <div class="bottom-item">
                  <p>${data.now.windScale}级</p>
                  <p>${data.now.windDir}</p>
                </div>
                <div>
                  <p>${data.now.humidity}% </p>
                  <p>相对湿度</p>
                </div>
                <div>
                  <p>${data.now.feelsLike}</p>
                  <p>体感温度</p>
                </div>
                <div>
                  <p>${data.now.vis}km</p>
                  <p>能见度</p>
                </div>
                <div>
                  <p>${data.now.precip}mm</p>
                  <p>降水量</p>
                </div>
                <div>
                  <p>${data.now.pressure}hPa</p>
                  <p>大气压</p>
                </div>
                <div>
                  <p>${data.now.cloud}%</p>
                  <p>云量</p>
                </div>
          `

      // 把创建好的 节点 添加到mainHome
      mainHome.appendChild(bottomList)
    } else {
      console.log('请求失败')
    }
  }
}
xhr.open('get', 'https://devapi.qweather.com/v7/weather/now?location=101010100&key=1475d5b69d5045088629747d480f86f0', true)
xhr.send()

// 时间格式更改
function getYMDHMS(timestamp) {
  let time = new Date(timestamp)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  let hours = time.getHours()
  let minute = time.getMinutes()

  if (month < 10) { month = '0' + month }
  if (date < 10) { date = '0' + date }
  if (hours < 10) { hours = '0' + hours }
  if (minute < 10) { minute = '0' + minute }
  return year + '-' + month + '-' + date + ' ' + hours + ':' + minute

}