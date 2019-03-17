import React from 'react';
import {Router, Route} from 'dva/router';
import Root from '../components/Root';
import IndexPage from './views/IndexPage';

export default ({history}) => (
	<Router history={history}>
		<Root>
			<Route path='/' component={IndexPage} />
		</Root>
	</Router>
);
