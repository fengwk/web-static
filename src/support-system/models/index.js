import {routerRedux} from 'dva/router';

export default {
	
	namespace: 'index',
	
	state: {

    collapsed: false,

    sub: '系统'

	},
	
	reducers: {
		
		setCollapsed(state, {collapsed}) {
			return {...state, collapsed};
		},

    setSub(state, {sub}) {
      return {...state, sub};
    }
		
	},
	
	effects: {
	  
	},
	
	subscriptions: {

	}
	
}

