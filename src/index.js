import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducers";
import App from "./containers/App/";
import Setting from "./containers/Setting/";

const middleware = [thunk];

if (process.env.NODE_ENV !== "production") {
	middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

render(
	<Provider store={store}>
		<Router>
			<div>
				<Route path="/" component={App} />
				<Route path="/setting" component={Setting} />
			</div>
		</Router>
	</Provider>,
	document.getElementById("root")
);
