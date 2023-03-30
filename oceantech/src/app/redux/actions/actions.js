import { ActionTypes } from "./actionTypes";
export const getListEmployeeRequest = () => {
  return { type: ActionTypes.GET_LIST_EMPLOYEE_REQUEST };
};

export const getListLocation = () => {
  return { type: ActionTypes.GET_LIST_LOCATION };
};
export const getOtherFeature = () => {
  return { type: ActionTypes.GET_OTHER_FEATURE };
};
export const getEmployeeData = (payload) => {
  return { type: ActionTypes.GET_EMPLOYEE_DATA, payload: payload };
};
export const addNewEmployee = (payload) => {
  return { type: ActionTypes.ADD_NEW_EMPLOYEE, payload: payload };
};
export const deleteEmployee = (payload) => {
  return { type: ActionTypes.DELETE_EMPLOYEE, payload: payload };
};
export const updateEmployee = (payload) => {
  return { type: ActionTypes.UPDATE_EMPLOYEE, payload: { data: payload, id: payload.id } };
};
