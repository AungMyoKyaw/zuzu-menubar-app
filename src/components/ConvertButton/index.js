import React, { Component } from "react";
import "./style.css";

class ConvertBox extends Component {
	render() {
		const { handleClick } = this.props;
		return (
			<button
				onClick={e => {
					handleClick(e.target.value);
				}}
			>
				<span>Convert</span>
			</button>
		);
	}
}

export default ConvertBox;
