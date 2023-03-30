import {
  GetListEmployee,
  addNewEmployee,
  deleteEmployee,
  updateEmployee,
} from "app/views/AddNewEmployee/EmployeeServices";
import { call, put } from "redux-saga/effects";
import { ActionTypes } from "app/redux/actions/actionTypes";

export function* getListEmployeeSaga() {
  try {
    const listEmployee = yield call(GetListEmployee);
    yield put({ type: ActionTypes.GET_LIST_EMPLOYEE_SUCCESS, payload: listEmployee.data });
  } catch (err) {
    console.log(err);
  }
}
export function* addNewEmployeeSaga(action) {
  yield put({ type: ActionTypes.GET_EMPLOYEE_DATA, payload: action.payload });
  yield call(addNewEmployee, action.payload);

  yield getListEmployeeSaga();
  console.log("Add");
}
export function* deleteEmployeeSaga(action) {
  yield call(deleteEmployee, action.payload);
  yield getListEmployeeSaga();
}
export function* updateEmployeeSaga(action) {
  yield put({ type: ActionTypes.GET_EMPLOYEE_DATA, payload: action.payload.data });
  yield call(updateEmployee, action.payload);
  yield getListEmployeeSaga();
}
