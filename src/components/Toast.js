import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Toast.css';

class Toast extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			render: true,
	    	active: false
		};
	}
	
	render() {
		if(this.state.render) {
			let active = styles.content;
			if(this.state.active) {
				active = styles.content + ' ' + styles.contentActive;
			} else {
				active = styles.content;
			}
			return (
				<div className={'toastContainer ' + styles.container}>
					<span className={active}>{this.props.msg}</span>
				</div>
			);
		} else {
			return null;
		}
	}
	
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				active: true
			})
			setTimeout(() => {
				this.setState({
					active: false
				})
				setTimeout(() => {
					this.setState({
						render: false
					})
				}, 300);
			}, this.props.duration - 310);
		}, 10);
	}
	
}

Toast.show = function(msg, duration = 2300) {
	let tempDiv = document.createElement('div');
	document.body.appendChild(tempDiv);
	ReactDOM.render(
		<Toast msg={msg} duration={duration} />,
		tempDiv);
	setTimeout(() => {
		tempDiv.remove();
	}, duration);
}

export default Toast;
