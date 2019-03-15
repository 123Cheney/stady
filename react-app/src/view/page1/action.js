export const ClickPage = () => {
  return {
    type: "CLICK_PAGE1",
    data: '这是一个数据'
  }
}

export const setCustomerChecked = () => {
  let data = 'fff';
  return dispatch=>{setTimeout(() => {
    dispatch({
      type: ActionType.GET_RegisterPositionData,
      data
  })
  }, 30000);}
  // return {
  //   type: "CLICK_PAGE1",
  //   data: data
  // }
}