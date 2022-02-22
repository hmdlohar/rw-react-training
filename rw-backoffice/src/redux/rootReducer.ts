import { combineReducers } from "redux";
import common from "./slices/common";

export const rootReducer = combineReducers({
    common,
});
