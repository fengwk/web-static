import React from 'react';
import Login from './login/Login';
import Register from './register/Register';
import Repassword from './repassword/Repassword';
import {connect} from 'dva';
import styles from './IndexPage.css';

class IndexPage extends React.Component {
	
	constructor(props) {
		super(props);
		this.rotateY = 0;
	}
	
	render() {
		let {state, dispatch} = this.props;
		let {shouldFlip, sub} = state;
		let subPage;
		switch (sub){
			case 1:
				subPage = <Login />;
				break;
			case 2:
				subPage = <Register />;
				break;
			case 3:
				subPage = <Repassword />;
				break;
		}
		if (shouldFlip) {
			this.rotateY += 360;
		}
		return (
			<div className={styles.container}>
				<div className={styles.center} style={{transform: `rotate(${this.rotateY}deg)`}}>
					{subPage}
				</div>
			</div>
		);
	}
	
}

export default connect(state => {
	return {state: state.index};
})(IndexPage);