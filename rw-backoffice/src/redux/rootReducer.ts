import { combineReducers } from "redux";
import common from "./slices/common";
import home from "./slices/home";
import companies from "./slices/companies";
import packages from "./slices/packages";
import users from "./slices/users";

export const rootReducer = combineReducers({
    common,
    home,
    companies,
    packages,
    users,
});
