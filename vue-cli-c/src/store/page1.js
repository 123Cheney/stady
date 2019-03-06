const page1={
  state:{
    info:{
      a:'这是英文字母a'
    }
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation,Vuex 中的 mutation 非常类似于事件
  mutations:{
    forInfo(state,params){
      state.info.a = params;
    }
  },
  // action 的作用跟mutation的作用是一致的，它提交mutation，从而改变state，是改变state的一个增强版
  // 不同在于：Action 提交的是 mutation，而不是直接变更状态
  
  actions:{
    changeInfo({commit},params){
      commit('forInfo',params)
    }
  },
};

export default page1;