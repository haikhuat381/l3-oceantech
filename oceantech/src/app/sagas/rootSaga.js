import { takeLatest, takeEvery } from "redux-saga/effects";
import { ActionTypes } from "app/redux/actions/actionTypes";
import { getListEmployeeSaga, deleteEmployeeSaga, updateEmployeeSaga } from "./EmployeeSaga";
import getListLocationSaga from "./LocationSaga";
import getOtherFeatureSaga from "./OtherFeatureSaga";
import { addNewEmployeeSaga } from "./EmployeeSaga";
export default function* rootSaga() {
  yield takeLatest(ActionTypes.GET_LIST_EMPLOYEE_REQUEST, getListEmployeeSaga);
  yield takeLatest(ActionTypes.GET_LIST_LOCATION, getListLocationSaga);
  yield takeLatest(ActionTypes.GET_OTHER_FEATURE, getOtherFeatureSaga);
  yield takeLatest(ActionTypes.GET_OTHER_FEATURE, getOtherFeatureSaga);
  yield takeLatest(ActionTypes.ADD_NEW_EMPLOYEE, addNewEmployeeSaga);
  yield takeLatest(ActionTypes.DELETE_EMPLOYEE, deleteEmployeeSaga);
  yield takeLatest(ActionTypes.UPDATE_EMPLOYEE, updateEmployeeSaga);
}
