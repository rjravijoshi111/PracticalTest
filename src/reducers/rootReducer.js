import { combineReducers } from 'redux';
import general from "@general/general.reducer";
import myHome from "@myHome/myHome.reducer";
import stripes from "@stripes/stripes.reducer";

const rootReducer = combineReducers({
    general,
    myHome,
    stripes
});

export default rootReducer;