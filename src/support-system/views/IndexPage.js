import React from 'react';
import {Layout, Menu, Icon, Button} from 'antd';
import {connect} from 'dva';
import {Link} from 'dva/router';
import SystemSvg from '../assets/svgs/system.svg';
import RoleSvg from '../assets/svgs/role.svg';
import PermissionSvg from '../assets/svgs/permission.svg';

const {Content, Footer, Sider} = Layout;

function IndexPage(props) {
  let {state, dispatch} = props;
  let {collapsed, sub} = state;
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider
        style={{
          overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          dispatch({
            type: 'index/setCollapsed',
            collapsed: !collapsed
          });
        }}
      >
        <div style={{
          height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFFFFF', fontSize: 50, fontWeight: 600
        }}>
          F
        </div>
        <Menu theme='dark' selectedKeys={[sub]} mode='inline' onSelect={({key}) => {
          // dispatch({
          //   type: 'index/switchSub',
          //   sub: key
          // });
        }}>
          <Menu.Item key='系统'>
            <Link to='/system'>
              <Icon component={SystemSvg} />
              <span>系统</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='用户'>
            <Link to='/user'>
              <Icon type='user' />
              <span>用户</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='角色'>
            <Link to='/role'>
              <Icon component={RoleSvg} />
              <span>角色</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='权限'>
            <Link to='/permission'>
              <Icon component={PermissionSvg} />
              <span>权限</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{marginLeft: collapsed ? 80 : 200}}>
        <div style={{margin: '16px 16px 0px 16px', display: 'flex', justifyContent: 'space-between'}}>
          <span style={{fontSize: 25, fontWeight: 600}}>{sub}</span>
          <Button>注销</Button>
        </div>
        <Content style={{margin: '16px 16px 0px 16px', overflowY: 'auto'}}>
          <div style={{padding: 24, background: '#fff', minHeight: 360}}>
            {props.children}
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Support system ©2019 Created by fengwk
        </Footer>
      </Layout>
    </Layout>
  );
}

export default connect(state => {
	return {state: state.index};
})(IndexPage);
