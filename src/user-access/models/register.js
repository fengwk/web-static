
export default {
	
	namespace: 'register',
	
	state: {
		email: ''
	},
	
	reducers: {
		
		setEmail(state, {email}) {
			return {...state, email};
		}
		
	},
	
	effects: {
		
	},
	
	subscriptions: {
		
	}
	
}

