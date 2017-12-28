import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style.css";

class Header extends Component {
	render() {
		return (
			<div className="header">
				<h1>ZuZu</h1>
				<div className="setting">
					<Link to="/setting">Settings</Link>
				</div>
			</div>
		);
	}
}

export default Header;
