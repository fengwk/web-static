import { set, get, remove } from '../util/localStore';
import { getState, resetAll } from '../util/app';

let WEB_STATE = 'WEB_STATE';

function buildWebState(webStateName) {
	return window.location.host + '_' + (webStateName || WEB_STATE);
}

function setWebState(webStateName) {
	set(buildWebState(webStateName), getState());
}

function getWebState(webStateName) {
	return get(buildWebState(webStateName));
}

function removeWebState(webStateName) {
	remove(buildWebState(webStateName));
	resetAll();
}

function createWebLocalStore(webStateName) {
	
	WEB_STATE = webStateName || WEB_STATE;
	
    function onStateChange() {
    	setWebState();
    }

    return {
        onStateChange
    }

}

export {
	setWebState,
	getWebState,
	removeWebState,
	createWebLocalStore
}