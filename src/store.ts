import {applyMiddleware, createStore, UnknownAction} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {ThunkAction, thunk} from "redux-thunk";
import rootReducer from "./reducers";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(rootReducer, composedEnhancer);

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType> = ThunkAction<
    ReturnType,
    RootState,
    undefined,
    UnknownAction
>;


export type RootState = ReturnType<typeof store.getState>;
export default store;