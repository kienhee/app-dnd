import { combineReducers } from "@reduxjs/toolkit";
import featuresReducer from "./features";
const rootReducer = combineReducers({
    features: featuresReducer,
});

export default rootReducer;