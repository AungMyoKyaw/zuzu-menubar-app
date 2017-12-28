// import { ipcRenderer } from "electron";
// const {ipcRenderer} = require('electron')
import * as knayi from "knayi-myscript";
import copy from "copy-to-clipboard";
const electron = window.require("electron");
// const fs = electron.remote.require("fs");
const { ipcRenderer } = electron;

export const OPTION = "OPTION";
export const OPTIONCHANGE = "OPTIONCHANGE";
export const TEXTCHANGE = "TEXTCHANGE";
export const CONVERTING = "CONVERTING";
export const CONVERTED = "CONVERTED";
export const SAVING = "SAVING";
export const SAVED = "SAVED";
export const COPYTOCLIPBOARD = "COPYTOCLIPBOARD";
export const HIDEMESSAGE = "HIDEMESSAGE";

const startConverting = () => ({
	type: CONVERTING
});

const receiveConverted = text => ({
	type: CONVERTED,
	text
});

const startSaving = () => ({
	type: SAVING
});

const saved = () => ({
	type: SAVED
});

const copyText = () => ({
	type: COPYTOCLIPBOARD
});

export const hideMessage = () => ({
	type: HIDEMESSAGE
});

const convertText = prevState => dispatch => {
	let {
		text,
		magic,
		uniHeader,
		zgFirst,
		zgHeader,
		copyToClipboard
	} = prevState;
	let prevText = text;
	let zgText, uniText;
	let encoding;
	try {
		encoding = knayi.fontDetect(text);
	} catch (e) {
		encoding = "";
	}
	dispatch(startConverting());
	if (magic) {
		switch (encoding) {
			case "zawgyi":
				zgText = text;
				uniText = knayi.fontConvert(text, "unicode");
				text = `${zgHeader}\n${zgText}\n${uniHeader}\n${uniText}`;
				break;
			case "unicode":
				uniText = text;
				zgText = knayi.fontConvert(text, "zawgyi");
				if (zgFirst) {
					text = `${zgHeader}\n${zgText}\n${uniHeader}\n${uniText}`;
				} else {
					text = `${uniHeader}\n${uniText}\n${zgHeader}\n${zgText}`;
				}
				break;
			default:
				break;
		}
	} else {
		switch (encoding) {
			case "zawgyi":
				uniText = knayi.fontConvert(text, "unicode");
				text = `${uniText}`;
				break;
			case "unicode":
				zgText = knayi.fontConvert(text, "zawgyi");
				text = `${zgText}`;
				break;
			default:
				break;
		}
	}
	dispatch(receiveConverted(text));
	dispatch(startSaving());
	try {
		if (prevText.length) {
			window.localStorage.setItem("zuzu_history", prevText);
		}
	} catch (e) {}
	dispatch(saved());
	if (copyToClipboard) {
		copy(text);
		dispatch(copyText());
		ipcRenderer.send("showNoti", "SUCCESSFULLY COPIED TO CLIPBOARD.");
	}
};

const shouldConvert = state => {
	const { isConverting, isSaving } = state;
	if (isConverting || isSaving) {
		return false;
	} else {
		return true;
	}
};

export const getOption = option => ({
	type: OPTION,
	option
});

export const optionChange = option => (dispatch, getState) => {
	const options = {
		...getState(),
		...option
	};
	delete options.text;
	try {
		window.localStorage.setItem("zuzu", JSON.stringify(options));
	} catch (e) {}

	dispatch({
		type: OPTIONCHANGE,
		option
	});
};

export const textChange = text => ({
	type: TEXTCHANGE,
	text
});

export const convertIfNeeded = () => (dispatch, getState) => {
	if (shouldConvert(getState())) {
		dispatch(convertText(getState()));
	}
};
