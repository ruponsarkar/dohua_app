import { combineReducers } from "redux";

import amountReducer from "./amountReducer";
import locationReducer from "./locationReducer"

const reducers = combineReducers({
    amount : amountReducer,
    location : locationReducer
})

export default reducers