import { call, put } from "redux-saga/effects";
import { ActionTypes } from "app/redux/actions/actionTypes";
import { GetListLocation } from "app/views/AddNewEmployee/EmployeeServices";
export default function* getListLocationSaga() {
  const location = yield call(GetListLocation);
  yield put({ type: ActionTypes.GET_LIST_LOCATION_SUCCESS, payload: location.data });
}
