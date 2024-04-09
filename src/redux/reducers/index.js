import { combineReducers } from "redux";

import amountReducer from "./amountReducer";
import locationReducer from "./locationReducer";
import getUser from "./userReducer";

const reducers = combineReducers({
    amount : amountReducer,
    location : locationReducer,
    user : getUser
})

export default reducers