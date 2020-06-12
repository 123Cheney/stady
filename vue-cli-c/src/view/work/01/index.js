var img1 = document.getElementById('click1'); //可点击元素
var img2 = document.getElementById('click2');
var img3 = document.getElementById('click3');
var img4 = document.getElementById('click4');

var tableData = [
  {index:'1',name:'单个企业社会信用代码验证',status:'已同意',provide:'市场监督管理局',apply:'公安局',option:'查看'},
  {index:'2',name:'单位企业名称查询',status:'已同意',provide:'市场监督管理局',apply:'人社厅',option:'查看'},
  {index:'3',name:'单位企业名称查询',status:'已同意',provide:'市场监督管理局',apply:'检察院',option:'查看'},
  {index:'4',name:'单位企业名称查询',status:'已同意',provide:'公安局',apply:'人社厅',option:'查看'},
  {index:'5',name:'单位企业名称查询',status:'已同意',provide:'人社厅',apply:'人社厅',option:'查看'},
  {index:'6',name:'单位企业名称查询',status:'已同意',provide:'民政局',apply:'检察院',option:'查看'},
  {index:'7',name:'单位企业名称查询',status:'已同意',provide:'市场监督管理局',apply:'公安局',option:'查看'},
  {index:'8',name:'单位企业名称查询',status:'已同意',provide:'市场监督管理局',apply:'公安局',option:'查看'},
  {index:'9',name:'单位企业名称查询',status:'已同意',provide:'公安局',apply:'检察院',option:'查看'},
  {index:'10',name:'单位企业名称查询',status:'已同意',provide:'检察院',apply:'检察院',option:'查看'},
];
var orderTemp = `<p><span>市场监督管理局</span><span class="bar"><span class="inside1"></span></span></p>
                <p><span>交通运输厅</span><span class="bar"><span class="inside2"></span></span></p>
                <p><span>公安厅</span><span class="bar"><span class="inside3"></span></span></p>
                <p><span>卫计委</span><span class="bar"><span class="inside4"></span></span></p>
                <p><span>人社厅</span><span class="bar"><span class="inside5"></span></span></p>`

var tabelTemp = ''
tableData.map((item, index)=>{
  tabelTemp += `<p>
                <span>${item.index}</span>
                <span>${item.name}</span>
                <span>${item.status}</span>
                <span>${item.provide}</span>
                <span>${item.apply}</span>
                <span onclick="showDetail('${item.index}')">${item.option}</span>
              </p>`
});

var popupBox = document.getElementById('popup');            //大弹窗
var popupDetail = document.querySelector('.popup .side');   //弹窗详情
var signImg = document.querySelector('#popup .side .sign'); 
var orderBoxTop = document.querySelector('.order-box');     //上部排序盒子
var topP = document.getElementById('top-p');                //上部排序盒子标题
var orderBoxFoot = document.querySelector('.order-box2');   //下部排序盒子
var footP = document.getElementById('foot-p');       //下部排序盒子标题
var chart = document.querySelector('.chart');       //图表盒子
var circleP = document.querySelectorAll('.circular p');       //半圆盒子的小标题

var canvas = document.querySelectorAll('.canvas');   //canvas

orderBoxTop.innerHTML = orderTemp;
orderBoxFoot.innerHTML = orderTemp;

document.querySelector('.tbody').innerHTML = tabelTemp;

img1.addEventListener('click',function(){showPopup(1)});
img2.addEventListener('click',function(){showPopup(2)});
img3.addEventListener('click',function(){showPopup(3)});
img4.addEventListener('click',function(){showPopup(4)});

document.getElementById('del1').onclick=function(){
  popupBox.style.display='none';
  popupDetail.style.display='none';
}

document.getElementById('del2').onclick=function(){
  popupDetail.style.display='none';
}

// 弹框
function showPopup(item){
  popupBox.style.display='initial';
  orderBoxTop.style.display = 'initial';
  orderBoxFoot.style.display = 'initial';
  topP.style.display = 'inherit';
  footP.style.display = 'inherit';
  signImg.style.display='initial';
  chart.style.display = 'none';
  document.querySelector('.circular>span').style.display = 'initial';
  switch(item){
    case 1:
      topP.innerText = '资源申请部门排序';
      footP.innerHTML = '资源提供部门排行';
      circleP[0].innerText = '已申请资源总次数';
      circleP[1].innerText = '资源总数';
      circleP[2].innerText = '半年新增资源数';
      circleP[3].innerText = '当月新增资源数';
      signImg.style.display='none';
      break;
    case 2:
    signImg.src = 'img/yi3.png';
      topP.innerHTML = '待审核资源提供部门排序';
      footP.innerHTML = '已审核资源提供部门排行';
      circleP[0].innerText = '待审核资源申请数';
      circleP[1].innerText = '已审核资源申请数';
      circleP[2].innerText = '未同意资源申请数';
      circleP[3].innerText = '同意资源申请数';
      break;
    case 3:
      signImg.src = 'img/yi1.png';
      orderBoxTop.style.display = 'none';
      orderBoxFoot.style.display = 'none';
      topP.style.display = 'none';
      footP.style.display = 'none';
      chart.style.display = 'flex';
      document.querySelector('.circular>span').style.display = 'none'
      circleP[1].innerText = '已审核资源申请数';
      circleP[2].innerText = '待反馈资源总数';
      circleP[3].innerText = '已反馈APIKEY资源总数';
			draw(30,canvas[0],1);
			draw(75,canvas[1],2);
			draw(51,canvas[2],3);
      break;
    case 4:
      signImg.src = 'img/yi2.png';
      topP.innerHTML = '已办结资源申请部门排序';
      footP.innerHTML = '已办结资源提供部门排序';
      circleP[0].innerText = '审核办结资源申请数';
      circleP[1].innerText = '库表类共享资源';
      circleP[2].innerText = '文件类共享资源';
      circleP[3].innerText = '接口类共享资源';
      break;
  }
}

// 详情弹框
function showDetail(item){
  popupDetail.style.display='initial';
  let index = parseInt(item)-1;
  document.getElementById('depart1').innerText = tableData[index].provide;
  document.getElementById('depart2').innerText = tableData[index].apply;
}

// 数字动态增加
var label = document.querySelectorAll('.right-sceond-content ul li label');
for(let i=0;i<label.length;i++){
  numAdd(label[i],parseInt(label[i].innerText));
};
function numAdd(dom,max){
  let i=0;
  let timer = setInterval(function(){
    if(i>=max){
      clearInterval(timer);
      dom.innerText = max;
      return
    }
    dom.innerText = i;
    i=i+3134;
  },50)
}

// 列表lunbo
var scrollContent = document.querySelector('.scroll-content');
var scrollBox = document.querySelector('.scroll-box');
var scrollBoxCopy = document.querySelector('#copy-scroll');
scrollBoxCopy.innerHTML = scrollBox.innerHTML;
  function scrollUp() {
    if (scrollContent.scrollTop == 208) {
      scrollContent.scrollTop = 0;
    } else {
      scrollContent.scrollTop++
    }
  }
  var time = 10;
  var mytimer = setInterval(scrollUp, time);
  scrollContent.onmouseover = function() {
    clearInterval(mytimer);
  }
  scrollContent.onmouseout = function() {
    mytimer = setInterval(scrollUp, time);
  }
	
// canvas 画图
function draw(percent,canvas,sign) {
  if (percent < 0 || percent > 100) {
    return;
  }
	var canvas = canvas,
			cxt = canvas.getContext('2d'),
			cWidth = canvas.width,
			cHeight = canvas.height,
			baseColor = '#02072f',
			textColor = '#fff',
			PI = Math.PI,
			sR = 1 / 2 * PI;
  var coverColor = cxt.createLinearGradient(150, 0, 150, 150);
  //添加颜色
	if(sign==1){
		coverColor.addColorStop(0, "#fe8900");
		coverColor.addColorStop(0.5, "#ffbb00");
		coverColor.addColorStop(1, "#f9cf82");
	}else if(sign==2){
		coverColor.addColorStop(0, "#00d8a9");
		coverColor.addColorStop(0.5, "#03c852");
		coverColor.addColorStop(1, "#00ffb0");
	}else{
		coverColor.addColorStop(0, "#ff0050");
		coverColor.addColorStop(0.5, "#ff0052");
		coverColor.addColorStop(1, "#ff9f7a");
	}
	
  var finalRadian = sR + ((PI + (PI - sR) * 2) * percent / 100); // 红圈的终点弧度
  var step = (PI + (PI - sR) * 2) / 100; // 一个1%对应的弧度大小
  var text = 0; // 显示的数字
  var timer = setInterval(function() {
    cxt.clearRect(0, 0, cWidth, cHeight);
    var endRadian = sR + text * step;
    // 画灰色圆弧
    drawCanvas(cWidth / 2, cHeight / 2, 55, sR, sR + (PI + (PI - sR) * 2), baseColor, 10);
    // 画红色圆弧
    drawCanvas(cWidth / 2, cHeight / 2, 55, sR, endRadian, coverColor, 10);
    // 数字
    cxt.fillStyle = textColor;
    cxt.font = '24px PT Sans';
    var textWidth = cxt.measureText(text + '%').width;
    cxt.fillText(text + '%', cWidth / 2 - textWidth / 2, cHeight / 2 + 15);
    text++;

    if (endRadian.toFixed(2) >= finalRadian.toFixed(2)) {
      clearInterval(timer);
    }
  }, 30);

  function drawCanvas(x, y, r, sRadian, eRadian, color, lineWidth) {
    cxt.beginPath();
    cxt.lineCap = "round";
    cxt.strokeStyle = color;
    cxt.lineWidth = lineWidth;
    cxt.arc(x, y, r, sRadian, eRadian, false);
    cxt.stroke();
  }
}