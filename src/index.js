import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./Routes";
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./store/reducers";
import { Provider } from 'react-redux';

const devTool = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;

function configureStore() {
    return createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk),
            process.env.NODE_ENV === "development" ? devTool : f => f
        )
    );
}

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister(); 
