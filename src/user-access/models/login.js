import Toast from '../../components/Toast';
import {loginByEmailAndPassword} from '../services/userAccessService';

const REGEX_EMAIL = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");

export default {
	
	namespace: 'login',
	
	state: {
		email: '',
		password: '',
		keepLogin: true
	},
	
	reducers: {
		
		setEmail(state, {email}) {
			return {...state, email};
		},
		
		setPassword(state, {password}) {
			return {...state, password};
		},
		
		setKeepLogin(state, {keepLogin}) {
			return {...state, keepLogin};
		},
		
	},
	
	effects: {

    *login(action, {select, put}) {
      let {email, password} = yield select(state => state.login);
      if (!email) {
        Toast.show('邮箱不能为空');
        return;
      }
      if (!REGEX_EMAIL.test(email)) {
        Toast.show('邮箱格式错误');
        return;
      }
      if (!password) {
        Toast.show('密码不能为空');
        return;
      }
      let res = yield loginByEmailAndPassword(email, password);
      console.log(res)
    }

	},
	
	subscriptions: {
		
	}
	
}

