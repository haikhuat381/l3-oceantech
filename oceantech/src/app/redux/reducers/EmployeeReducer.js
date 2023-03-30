import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  listEmployee: [],
  employeeData: {
    listDiploma: [],
    listRelationship: [],
    // listPromote:[],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_LIST_EMPLOYEE_SUCCESS: {
      return { ...state, listEmployee: action.payload };
    }
    case ActionTypes.GET_EMPLOYEE_DATA: {
      return { ...state, employeeData: action.payload };
    }

    default:
      return state;
  }
};
