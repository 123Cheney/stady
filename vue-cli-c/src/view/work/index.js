var img1 = document.getElementById('click1');
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
var popupBox = document.getElementById('popup');
var popupDetail = document.querySelector('.popup .side');

img1.onclick=function(){
  popupBox.style.display='initial';
  document.getElementById('top-p').innerHTML = '资源申请部门排序';
  document.getElementById('foot-p').innerHTML = '资源提供部门排行';
  document.querySelector('.order-box').innerHTML = orderTemp;
  document.querySelector('.order-box2').innerHTML = orderTemp;
  document.querySelector('.tbody').innerHTML = tabelTemp;
}

img2.onclick=function(){
  popupBox.style.display='initial';
  document.getElementById('top-p').innerHTML = '待审核资源提供部门排序';
  document.getElementById('foot-p').innerHTML = '已审核资源提供部门排行';
}

img4.onclick=function(){
  popupBox.style.display='initial';
  document.getElementById('top-p').innerHTML = '已办结资源申请部门排序';
  document.getElementById('foot-p').innerHTML = '已办结资源提供部门排序';
}

document.getElementById('del1').onclick=function(){
  popupBox.style.display='none';
  popupDetail.style.display='none';
}

document.getElementById('del2').onclick=function(){
  popupDetail.style.display='none';
}

function showDetail(item){
  popupDetail.style.display='initial';
  let index = parseInt(item)-1;
  document.getElementById('depart1').innerText = tableData[index].provide;
  document.getElementById('depart2').innerText = tableData[index].apply;
}
