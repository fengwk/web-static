export default {
	
	namespace: 'index',
	
	state: {
		shouldFlip: false,
		sub: 1// 1-Login;2-Register;3-Repassword;
	},
	
	reducers: {
		
		setSub(state, {sub}) {
			let shouldFlip = state.sub != sub ? true : false;
			return {...state, shouldFlip, sub};
		}
		
	},
	
	effects: {
		
	},
	
	subscriptions: {
		
	}
	
}

