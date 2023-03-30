import Loadable from "app/components/Loadable";
import { lazy } from "react";

const AddNewEmployee = Loadable(lazy(() => import("./AddNewEmployee")));

const AddNewEmployeeRoutes = [{ path: "/addnew_employee", element: <AddNewEmployee /> }];

export default AddNewEmployeeRoutes;
