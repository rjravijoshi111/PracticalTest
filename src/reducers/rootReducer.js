import { combineReducers } from 'redux';
import general from "@general/general.reducer";
import myHome from "@myHome/myHome.reducer";

const rootReducer = combineReducers({
    general,
    myHome,
});

export default rootReducer;