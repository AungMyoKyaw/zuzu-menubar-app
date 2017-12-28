import * as knayi from "knayi-myscript";
import copy from "copy-to-clipboard";
const electron = window.require("electron");
const { ipcRenderer } = electron;

export const OPTION = "OPTION";
export const OPTIONCHANGE = "OPTIONCHANGE";
export const TEXTCHANGE = "TEXTCHANGE";
export const CONVERTING = "CONVERTING";
export const CONVERTED = "CONVERTED";
export const COPYTOCLIPBOARD = "COPYTOCLIPBOARD";
export const HIDEMESSAGE = "HIDEMESSAGE";

const startConverting = () => ({
	type: CONVERTING
});

const receiveConverted = text => ({
	type: CONVERTED,
	text
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
		copyToClipboard,
		closeWindow,
		showNoti
	} = prevState;
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

	//switch option
	if (copyToClipboard) {
		copy(text);
		dispatch(copyText());
	}
	if (closeWindow) {
		ipcRenderer.send("hideWindow");
	}
	if (showNoti) {
		ipcRenderer.send("showNoti", "SUCCESSFULLY COPIED TO CLIPBOARD.");
	}
};

const shouldConvert = state => {
	const { isConverting, isSaving, text } = state;
	if (isConverting || isSaving || text === "") {
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
	} else {
		console.log("SHOULD NOT BE CONVERTED");
	}
};
