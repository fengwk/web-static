import {getState, dispatch} from '../util/app'
import moment from 'moment'

const LOGIN = '@@DVA_LOGIN_SESSION/LOGIN';
const UNLOGIN = '@@DVA_LOGIN_SESSION/UNLOGIN';
const NAMESPACE = 'loginSession';

function setLoginSession(loginSession) {
	dispatch({type: LOGIN, loginSession});
}

function removeLoginSession() {
	dispatch({type: UNLOGIN});
}

function getLoginSession() {
	let currentState = getState();
	let loginSession = currentState && currentState.loginSession && currentState.loginSession.loginSession;
	if(!loginSession || !loginSession.token) {
		return undefined;
	}
	let currentTime = (new Date()).getTime();
	let loginTime = moment(loginSession.token.loginTime).valueOf();
	let timeout = loginSession.token.timeout;
	if(timeout < 0 || currentTime - loginTime < timeout * 1000) {
		return loginSession;
	} else {
		removeLoginSession();
		return undefined;
	}
}

function createLoginSession(opts = {}) {
	
	const namespace = opts.namespace || NAMESPACE;
	const initialState = {loginSession: undefined};

  	const extraReducers = {
		[namespace](state = initialState, {type, loginSession}) {
			
		  	let ret = state;
		  	switch (type) {
			    case LOGIN:
			    	ret = {loginSession};
			      	break;
			    case UNLOGIN:
			    	ret = {loginSession: undefined};
			      	break;
		  	}
		  	return ret;
		}
  	};

  	return {
    	extraReducers
  	};
  
}

export {
	createLoginSession,
	setLoginSession,
	removeLoginSession,
	getLoginSession
}
