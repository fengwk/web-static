import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import Root from '../components/Root';
import IndexPage from './views/IndexPage';
import System from './views/system/System';
import User from './views/user/User';
import Role from './views/role/Role';
import Permission from './views/permission/Permission';

export default ({history}) => (
	<Router history={history}>
    {/*
      使用render方法兼容内嵌路由
      https://blog.csdn.net/arsiya_jerry/article/details/78122827
    */}
		<Route render={({history, location, match}) => (
      <Root>
        <IndexPage>
          <Switch>
            <Route path='/system' component={System} />
            <Route path='/user' component={User} />
            <Route path='/role' component={Role} />
            <Route path='/permission' component={Permission} />
          </Switch>
        </IndexPage>
      </Root>
    )} />
	</Router>
);
