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
})

var popupBox = document.getElementById('popup');            //大弹窗
var popupDetail = document.querySelector('.popup .side');   //弹窗详情
var orderBoxTop = document.querySelector('.order-box');     //上部排序盒子
var topP = document.getElementById('top-p');                //上部排序盒子标题
var orderBoxFoot = document.querySelector('.order-box2');   //下部排序盒子
var footP = document.getElementById('foot-p');       //下部排序盒子标题

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
  switch(item){
    case 1:
      topP.innerText = '资源申请部门排序';
      footP.innerHTML = '资源提供部门排行';
      break;
    case 2:
      topP.innerHTML = '待审核资源提供部门排序';
      footP.innerHTML = '已审核资源提供部门排行';
      break;
    case 3:
      orderBoxTop.style.display = 'none';
      orderBoxFoot.style.display = 'none';
      topP.style.display = 'none';
      footP.style.display = 'none';
      break;
    case 4:
      topP.innerHTML = '已办结资源申请部门排序';
      footP.innerHTML = '已办结资源提供部门排序';
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