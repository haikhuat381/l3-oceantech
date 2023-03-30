import { combineReducers } from "redux";
import EmployeeReducer from "./EmployeeReducer";
import LocationReducer from "./LocationReducer";
import OtherFeatureReducer from "./OtherFeatureReducer";
export default combineReducers({
  Employee: EmployeeReducer,
  Location: LocationReducer,
  OtherFeature: OtherFeatureReducer,
});
