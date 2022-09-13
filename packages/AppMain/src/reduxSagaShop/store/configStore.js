import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "../reducer/rootReducer";
import createSagaMiddleware from 'redux-saga';
import appSaga from "../middleware/appSaga";

const sagaMiddleware = createSagaMiddleware()
export const configStore = (initialState) => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware)
    )
    sagaMiddleware.run(appSaga)
    return store
}
