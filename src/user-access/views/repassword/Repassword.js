import React from 'react';
import {Input, Button} from 'antd';
import {Link} from 'dva/router';
import {connect} from 'dva';
import styles from './Repassword.css';

function Repassword(props) {
	let {state, dispatch} = props;
	let {email} = state;
	// 动态计算验证码输入框长度
	let randomInputW = 156;
	let randomBtnDom = document.querySelector('.randomBtn');
	if (randomBtnDom) {
		randomInputW = 220 - randomBtnDom.offsetWidth;
	}
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<span className={styles.toLoginSpan} onClick={() => {
					dispatch({
						type: 'index/setSub',
						sub: 1
					})
				}}>
					立即登录
				</span>
			</div>
			<div className={styles.body}>
				<Input placeholder="邮箱" value={email} onChange={e => {
					dispatch({
						type: 'register/setEmail',
						email: e.target.value
					});
				}} />
				<Input className={styles.lineItem} style={{width: randomInputW}} placeholder="验证码" />
				<Button className='randomBtn' type='primary'>获取</Button>
				<Input.Password className={styles.lineItem} placeholder="新密码"  />
				<Button className={styles.lineItem} type='primary' block>重置</Button>
			</div>
		</div>
	);
}

export default connect(state => {
	return {state: state.repassword};
})(Repassword);