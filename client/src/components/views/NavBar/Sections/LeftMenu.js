import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="subscription">
      <a href="/subscription">Subscription</a>
    </Menu.Item>
    <Menu.Item key="favorite">
        <a href="/favorite">Favorite</a>
      </Menu.Item>
      <Menu.Item key="Recommend">
      <a href="/Recommend">Recommended</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu