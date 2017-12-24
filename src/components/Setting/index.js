import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style.css";

class Setting extends Component {
	render() {
		const {
			magic,
			copyToClipboard,
			zgFirst,
			uniHeader,
			zgHeader,
			handleChange
		} = this.props;

		return (
			<div>
				<Link to="/">
					<div className="overlay" />
				</Link>
				<div className="box">
					<div className="label">UNi Header</div>
					<input
						type="text"
						placeholder="text"
						className="headerName"
						value={uniHeader}
						onChange={e => {
							handleChange({
								uniHeader: e.target.value
							});
						}}
					/>
					<div className="label">ZG Header</div>
					<input
						type="text"
						placeholder="text"
						className="headerName"
						value={zgHeader}
						onChange={e => {
							handleChange({
								zgHeader: e.target.value
							});
						}}
					/>
					<div className="option">
						<label>
							<input
								type="checkbox"
								checked={magic}
								onChange={e => {
									handleChange({
										magic: e.target.checked
									});
								}}
							/>
							<span />
						</label>
						<div className="optionName">magic</div>
					</div>
					<div className="option">
						<label>
							<input
								type="checkbox"
								checked={zgFirst}
								onChange={e => {
									handleChange({
										zgFirst: e.target.checked
									});
								}}
							/>
							<span />
						</label>
						<div className="optionName">Zg First</div>
					</div>
					<div className="option">
						<label>
							<input
								type="checkbox"
								checked={copyToClipboard}
								onChange={e => {
									handleChange({
										copyToClipboard: e.target.checked
									});
								}}
							/>
							<span />
						</label>
						<div className="optionName">Copy to Clipboard</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Setting;
