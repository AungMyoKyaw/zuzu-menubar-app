import React, { Component } from "react";
import { connect } from "react-redux";

import { optionChange } from "../actions";
import Setting from "../components/Setting/";

class SettingContainer extends Component {
	handleChange = option => {
		const { dispatch } = this.props;
		dispatch(optionChange(option));
	};

	render() {
		const {
			magic = true,
			copyToClipboard = false,
			zgFirst = false,
			uniHeader = "[Unicode]",
			zgHeader = "[Zawgyi]"
		} = this.props;

		return (
			<Setting
				magic={magic}
				zgFirst={zgFirst}
				copyToClipboard={copyToClipboard}
				uniHeader={uniHeader}
				zgHeader={zgHeader}
				handleChange={this.handleChange}
			/>
		);
	}
}

const mapStateToProps = state => {
	const { magic, copyToClipboard, zgFirst, uniHeader, zgHeader } = state;
	return {
		magic,
		copyToClipboard,
		zgFirst,
		uniHeader,
		zgHeader
	};
};

export default connect(mapStateToProps)(SettingContainer);
