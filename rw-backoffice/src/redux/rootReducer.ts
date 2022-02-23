import { combineReducers } from "redux";
import common from "./slices/common";
import home from "./slices/home";
import companies from "./slices/companies";

export const rootReducer = combineReducers({
    common,
    home,
    companies
});
