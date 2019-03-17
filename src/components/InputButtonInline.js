import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Button} from 'antd';

class InputButtonInline extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			inputWisth: 0
		};
		this.refContainer = React.createRef();
		this.refButton = React.createRef();
	}
	
	render() {
		return(
			<div ref={this.refContainer} className={this.props.className}>
				<Input style={{width: this.state.inputWisth}} placeholder={this.props.inputPlaceholder} onChange={this.props.inputOnChange} />
				<Button ref={this.refButton} className='randomBtn' type='primary' onClick={this.props.buttonOnClick}>{this.props.buttonText}</Button>
			</div>
		);
	}
	
	componentDidMount() {
		let inputWidth = this.refContainer.current.offsetWidth - ReactDOM.findDOMNode(this.refButton.current).offsetWidth;
		if (inputWidth != this.state.inputWisth) {
			this.setState({inputWisth: inputWidth})
		}
	}
	
}

export default InputButtonInline;