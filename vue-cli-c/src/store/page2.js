const page2={
  state:{
    taskList:[
      {name:'aaa',status:'doing'},
      {name:'bbb',status:'done'},
      {name:'ccc',status:'doing'},
      {name:'ddd',status:'done'}
    ]
  },
  mutation:{
    updateTask(state,param){
      state.information = param;
    }
  },
  action:{
    updateInfo(params){
      commit('updateInfo',params)
    }
  },
  getters:{
    doneList: state=> state.taskList.filter(a=>a.status=='done')
  }
}
export default page2;