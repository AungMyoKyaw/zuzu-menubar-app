import React, { Component } from "react";
import { connect } from "react-redux";

import {
	convertIfNeeded,
	textChange,
	getOption
} from "../actions";
import TextBox from "../components/TextBox/";
import ConvertButton from "../components/ConvertButton/";
import SettingButton from "../components/SettingButton/";
import Snackbar from "../components/Snackbar/";

class App extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		let defaultOption = {
			magic: true,
			zgFirst: false,
			copyToClipboard: false,
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

	componentDidUpdate() {
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
		const { text, show } = this.props;

		return (
			<div>
				<TextBox text={text} handleChange={this.handleChange} />
				<ConvertButton handleClick={this.handleClick} />
				{show ? <Snackbar show={show} /> : ""}
				<SettingButton />
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { text, show } = state;
	return {
		text,
		show
	};
};

export default connect(mapStateToProps)(App);
