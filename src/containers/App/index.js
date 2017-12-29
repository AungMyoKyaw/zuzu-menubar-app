import React, { Component } from "react";
import { connect } from "react-redux";
import { HotKeys } from "react-hotkeys";

import { convertIfNeeded, textChange, getOption } from "../../actions";
import TextBox from "../../components/TextBox/";
import ConvertButton from "../../components/ConvertButton/";
import Header from "../../components/Header/";

const keyMap = {
	convert: ["command+enter","ctrl+enter"],
	pref: ["command+,","ctrl+,"]
};

class App extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		let defaultOption = {
			magic: true,
			zgFirst: false,
			copyToClipboard: true,
			closeWindow: true,
			showNoti: true,
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
			},
			pref: e => {
				if (this.props.location.pathname === "/") {
					this.props.history.push("/setting");
				} else {
					this.props.history.push("/");
				}
			}
		};

		return (
			<HotKeys keyMap={keyMap} handlers={handlers}>
				<div className="app">
					<Header />
					<TextBox text={text} handleChange={this.handleChange} />
					<ConvertButton handleClick={this.handleClick} />
				</div>
			</HotKeys>
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
