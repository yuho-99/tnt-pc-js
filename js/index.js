// 点击导航显示对应内容
// 获取导航
let tabs = document.querySelectorAll('.navbar li')
let contents = document.querySelectorAll('#mainbox > div')

// 点击 后添加 active类名
for (let i = 0; i < tabs.length; i++) {
  tabs[0].className = 'active',
    contents[0].className = 'main-active'
  // tabs[i].className = ''
  tabs[i].index = i;
  tabs[i].addEventListener('click', function () {
    for (let e = 0; e < tabs.length; e++) {
      tabs[e].className = ''
      contents[e].className = ''
    }
    // 保留自己
    this.className = 'active';
    contents[this.index].className = 'main-active'
  })
}

// 点击获取首页
// let homeContent = document.getElementById('homeContent')
// homeContent.onclick = function () {
//   const data = ajax('get', 'https://api.qweather.com/v7/weather/now?location=101010100&key=1475d5b69d5045088629747d480f86f0', false)
//   console.log(data)
// }

let navContent = document.getElementById('navContent')
// 点击获取导航
navContent.onclick = function () {
  let mainNav = document.getElementById('mainNav')
  mainNav.innerHTML = ''
  const data = ajax('get', 'http://43.143.179.237:3000/api/tech-nav', false)

  data.forEach((val) => {
    let all = document.createElement('li')
    let divs = document.createElement('div')
    divs.className = 'wenz'
    divs.innerHTML = `<a href="${val.linksSrc}" target="_blank">${val.title}</a> <p> ${val.content} </p> `
    let divimg = document.createElement('div')
    divimg.innerHTML = `<img src="${val.iconUrl}" alt="" width='24'>`
    all.appendChild(divs)
    all.appendChild(divimg)
    mainNav.appendChild(all)
  });
}
// 点击获取手册信息
let manualContent = document.getElementById('manualContent')
manualContent.onclick = function () {
  let mainManual = document.getElementById('mainManual')
  mainManual.innerHTML = ''
  const data = ajax('get', 'http://43.143.179.237:3000/api/manual', false)

  data.forEach((val) => {
    let all = document.createElement('li')
    let divs = document.createElement('div')
    divs.className = 'wenz'
    divs.innerHTML = `<a href="${val.linksSrc}" target="_blank">${val.title}</a> <p> ${val.content} </p> `
    let divimg = document.createElement('div')
    divimg.innerHTML = `<img src="${val.iconUrl}" alt="" width='24'>`
    all.appendChild(divs)
    all.appendChild(divimg)
    mainManual.appendChild(all)
  });
}
// 点击技术 获取分类 和文章
let itContent = document.getElementById('itContent')
itContent.onclick = function () {
  // 默认先 获取所有文章
  let mainTech = document.getElementById('mainTech')
  mainTech.innerHTML = ''
  const data1 = ajax('get', 'http://43.143.179.237:3000/api/articles', false)

  data1.forEach((val) => {
    let all = document.createElement('div')
    all.innerHTML = `
                      <a href="#" class="article-title">${val.title}</a>
                      <div class="article-content">${val.content}</div>
                    `
    mainTech.appendChild(all)
  });

  // 获取分类
  let asideTech = document.getElementById('asideTech')
  asideTech.innerHTML = ''
  const data = ajax('get', 'http://43.143.179.237:3000/api/categories', false) 
  
  data.forEach((val) => {
    let all = document.createElement('li')
    all.innerHTML = `<a href="#"> <span> ${val.name} </span> </a> `
    asideTech.appendChild(all)
    // all.className = ''
    // 通过分类获取文章
    all.addEventListener('click', function () {
      mainTech.innerHTML = ''
      // 发送请求 并渲染到页面
      const url = 'http://43.143.179.237:3000/api/articles' + '?' + 'category=' + `${val._id}` + '&' + 'status=published'
      const data1 = ajax('get', url, false)
      data1.forEach((val) => {
        let all1 = document.createElement('div')
        all1.innerHTML = `
                      <a href="#" class="article-title">${val.title}</a>
                      <div class="article-content">${val.content}</div>
                    `
        mainTech.appendChild(all1)
      });
      // this.className = 'category-current'
      // console.log(this.className)
    })
  });
}

// 点击某个分类 ，然后根据分类查询相关内容
// 技术下面 分类和文章优化 
// 进入it技术页面 默认是 请求第一个分类下面的所有文章
// 文章需要是published状态的
