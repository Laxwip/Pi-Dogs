//* Configuracion de la store:

import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import reducer from "./reducer/reducer";

const composeDevExtansion = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeDevExtansion(applyMiddleware(thunk))
);

export default store;