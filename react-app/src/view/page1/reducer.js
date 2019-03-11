// import ActionType from './../../actionTypes.js';

export function page1(state = {}, action) {
  console.log(action.type,'action.type')
    switch(action.type) {
      case 'CLICK_PAGE1':
          return Object.assign({},state,{myData:action.data});
    }
    return state;
}