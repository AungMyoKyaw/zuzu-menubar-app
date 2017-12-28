import React, { Component } from "react";
import "./style.css";

class TextBox extends Component {
	render() {
		const { text, handleChange } = this.props;
		return (
			<textarea
				autoFocus="true"
				className="textBox"
				placeholder="TYPE HERE"
				type="text"
				onChange={e => {
					handleChange(e.target.value);
				}}
				value={text}
			/>
		);
	}
}

export default TextBox;
