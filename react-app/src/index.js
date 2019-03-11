import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PageOne from './view/page1/index'
import PageTwo from './view/page2/index'
import Menu from './component/menu/index'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducers from './combineReducer';
let store = createStore(reducers);
ReactDOM.render(
  // React Router 4 不再提倡中心化路由。取之的是路由存在于布局和 UI 之间。
  <Provider store={store}>
    <Router>
      <div className='layOut'>
        <Route path='/' component={Menu}></Route>
        <div className='rightContent'>
          <Route path='/page1' exact component={PageOne}></Route> 
          <Route path='/detail' exact component={PageTwo}></Route> 
          <Route path='/page2' component={PageTwo}></Route> 
        </div>
      </div>
    </Router>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
