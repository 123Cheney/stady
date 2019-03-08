import React, { Component } from 'react';
import { Link , withRouter} from "react-router-dom";
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;
class Home extends Component {
  constructor(props) {
    super(props);
  }
  changePage=({ item, key})=>{
    this.props.history.push(key);
  }
  render() {
    return ( 
      <div className="leftMenu">
        <Menu style={{ width: 256 }} defaultSelectedKeys={['1']} 
          defaultOpenKeys={['sub1']} mode='inline'
          onClick={ this.changePage }>
          <Menu.Item key="page1"><Icon type="mail" />page1</Menu.Item>
          <Menu.Item key="page2"><Icon type="calendar" />page2</Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>Navigation Three</span></span>}>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
            <SubMenu key="sub1-2" title="Submenu">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    )}
}

export default Home;