// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import echarts from 'echarts'
import './assets/font/iconfont.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './common.scss'

Vue.prototype.$echarts = echarts;
Vue.use(iView);
Vue.use(ElementUI);
Vue.config.productionTip = false;
document.documentElement.style.fontSize = document.documentElement.scrollWidth / 1440*100 + 'px';
window.onresize = function(){
  document.documentElement.style.fontSize = document.documentElement.offsetWidth / 1440*100 + 'px';
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
