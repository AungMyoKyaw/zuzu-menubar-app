import React, { Component } from "react";
import "./style.css";

class TextBox extends Component {
	render() {
		const { text, handleChange } = this.props;
		return (
			<div className="paper">
				<div className="paper-content">
					<textarea
						type="text"
						onChange={e => {
							handleChange(e.target.value);
						}}
						value={text}
					/>
				</div>
			</div>
		);
	}
}

export default TextBox;
