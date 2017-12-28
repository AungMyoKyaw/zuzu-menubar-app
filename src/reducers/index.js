import {
	CONVERTING,
	CONVERTED,
	SAVING,
	SAVED,
	TEXTCHANGE,
	OPTION,
	OPTIONCHANGE,
	COPYTOCLIPBOARD,
	HIDEMESSAGE
} from "../actions";

export default (state = {}, action) => {
	switch (action.type) {
		case OPTION:
			return {
				...state,
				...action.option
			};
		case OPTIONCHANGE:
			return {
				...state,
				...action.option
			};
		case TEXTCHANGE:
			return {
				...state,
				text: action.text,
				show: false
			};
		case CONVERTING:
			return {
				...state,
				isConverting: true
			};
		case CONVERTED:
			return {
				...state,
				text: action.text,
				isConverting: false
			};
		case SAVING:
			return {
				...state,
				isSaving: true
			};
		case SAVED:
			return {
				...state,
				isSaving: false
			};
		case COPYTOCLIPBOARD:
			return {
				...state,
				text: ""
			};
		case HIDEMESSAGE:
			return {
				...state,
				show: false
			};
		default:
			return state;
	}
};
