import React from 'react';
import {Input, Button, Checkbox} from 'antd';
import {connect} from 'dva';
import logo from '../../assets/imgs/logo.png';
import styles from './Login.css';

function Login(props) {
	let {state, dispatch} = props;
	let {email, password, keepLogin} = state;
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<img className={styles.logo} src={logo} />
			</div>
			<div className={styles.body}>
				<Input className={styles.input1} placeholder='邮箱' value={email} onChange={e => {
					dispatch({
						type: 'login/setEmail',
						email: e.target.value
					});
				}} />
				<Input.Password className={styles.input2} placeholder='密码' value={password} onChange={e => {
					dispatch({
						type: 'login/setPassword',
						password: e.target.value
					});
				}} />
				<div className={styles.line1}>
					<span onClick={() => {
						dispatch({
							type: 'login/setKeepLogin',
							keepLogin: !keepLogin
						});
					}}>
						<Checkbox checked={keepLogin} />
						<span className={styles.keepLoginSpan}>保持登录</span>
					</span>
				</div>
				<Button className={styles.button} type='primary' block onClick={() => {
				  dispatch({
            type: 'login/login'
          });
        }}>
          登录
        </Button>
				<div className={styles.line2}>
					<span className={styles.itemSpan} onClick={() => {
						dispatch({
							type: 'index/setSub',
							sub: 3
						})
					}}>
						忘记密码
					</span>
					<span className={styles.itemSeparator}>|</span>
					<span className={styles.itemSpan} onClick={() => {
						dispatch({
							type: 'index/setSub',
							sub: 2
						})
					}}>
						注册帐号
					</span>
				</div>
			</div>
		</div>
	);
}

export default connect(state => {
	return {state: state.login};
})(Login);
