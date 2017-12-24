import React, { Component } from "react";

import "./style.css";

class Snackbar extends Component {
	render() {
		const { show } = this.props;
		return (
			<div className={show ? "snackbar" : "hide"}>
				<div className="message">SUCCESSFULLY COPIED TO CLIPBOARD.</div>
			</div>
		);
	}
}

export default Snackbar;
