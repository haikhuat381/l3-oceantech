import { getOtherFeature } from "app/views/AddNewEmployee/EmployeeServices";
import { call, put } from "redux-saga/effects";
import { ActionTypes } from "app/redux/actions/actionTypes";
export default function* getOtherFeatureSaga() {
  const otherFeature = yield call(getOtherFeature);
  yield put({ type: ActionTypes.GET_OTHER_FEATURE_SUCCESS, payload: otherFeature.data });
}
