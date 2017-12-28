import React, { Component } from "react";
import { connect } from "react-redux";
import { HotKeys } from "react-hotkeys";

import { convertIfNeeded, textChange, getOption } from "../../actions";
import TextBox from "../../components/TextBox/";
import ConvertButton from "../../components/ConvertButton/";
import Header from "../../components/Header/";

const keyMap = {
	convert: "command+enter"
};

class App extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		let defaultOption = {
			magic: true,
			zgFirst: false,
			copyToClipboard: true,
			uniHeader: "[Unicode]",
			zgHeader: "[Zawgyi]"
		};
		let option;
		try {
			option = JSON.parse(window.localStorage.getItem("zuzu")) || defaultOption;
		} catch (e) {
			option = defaultOption;
		}
		dispatch(getOption(option));
	}

	handleChange = text => {
		const { dispatch } = this.props;
		dispatch(textChange(text));
	};

	handleClick = text => {
		const { dispatch } = this.props;
		dispatch(convertIfNeeded());
	};

	render() {
		const { text } = this.props;
		const handlers = {
			convert: e => {
				this.handleClick();
			}
		};

		return (
			<div className="app">
				<Header />
				<HotKeys keyMap={keyMap} handlers={handlers}>
					<TextBox text={text} handleChange={this.handleChange} />
				</HotKeys>
				<ConvertButton handleClick={this.handleClick} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { text } = state;
	return {
		text
	};
};

export default connect(mapStateToProps)(App);
