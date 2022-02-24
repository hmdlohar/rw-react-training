import { combineReducers } from "redux";
import common from "./slices/common";
import home from "./slices/home";
import companies from "./slices/companies";
import packages from "./slices/packages";

export const rootReducer = combineReducers({
    common,
    home,
    companies,
    packages
});
