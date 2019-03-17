
export default {
	
	namespace: 'repassword',
	
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

