import React, { Component } from 'react';
import { Link , withRouter} from "react-router-dom";
import { message } from 'antd';

class PageOne extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    
  }
  render() {
    return ( 
      <div className="page1" >
      <Link to='/detail'> page1</Link>
       
      </div>
    );
  }
}

export default PageOne;