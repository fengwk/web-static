import {clone} from '../lib/utils';

const LOCK = '@@DVA_EFFECT_LOCK/LOCK';
const UNLOCK = '@@DVA_EFFECT_LOCK/UNLOCK';
const NAMESPACE = 'effectLock';

const STATE_UNLOCK = 1;
const STATE_LOCKED = 2;

/**
 * 1.在loading插件之后注册该接口
 * 2.注册该插件后,同一effect调用变为串行
 */
function createEffectLock(opts = {}) {
		
	const namespace = opts.namespace || NAMESPACE;
	const initialState = {
		locks: {}
	};
	
	const extraReducers = {
		[namespace](state = initialState, {type, payload}) {
			const {actionType} = payload || {};
			let ret = clone(state);
			let lockState = ret.locks[actionType];
			switch (type) {
			  // lock reducer
				case LOCK:
          ret.locks[actionType] = STATE_LOCKED;
					break;
        // unlock reducer
				case UNLOCK:
          ret.locks[actionType] = STATE_UNLOCK;
					break;
			}
			return ret;
		},
	};
	
	function onEffect(effect, {select, put}, model, actionType) {
		return function*(...args) {
		  let {locks} = yield select(state => state[namespace]);
			if(!locks[actionType] || locks[actionType] === STATE_UNLOCK) {
        yield put({type: LOCK, payload: {actionType}});
				yield effect(...args);
        yield put({type: UNLOCK, payload: {actionType}});
			}
		};
	}
	
	return {
		extraReducers,
		onEffect
	};
  
}

export default createEffectLock;
