import React, { Component } from 'react';
import { Link , withRouter} from "react-router-dom";
import { connect } from 'react-redux'

class PageOne extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    
  }
  handleClick=()=>{
    alert('单击按钮了')
    this.props.handleClick();
  }
  render() {
    return ( 
      <div className="page1" >
        <button onClick={this.handleClick}>Action</button>
        <Link to='/detail'>page1</Link>
      </div>
    );
  }
}
function mapStateToProps(state = {}, ownProps) {
  console.log(state)
  return state;
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClick: (callback) => {
      dispatch({
          type:'CLICK_PAGE1',
          data:'这是一个数据'
        });
    }, 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PageOne);