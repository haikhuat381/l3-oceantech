import Loadable from "app/components/Loadable";
import { lazy } from "react";

const ManageEmployee = Loadable(lazy(() => import("./ManageEmployee")));

const ManageEmployeeRoutes = [{ path: "/manage_employee", element: <ManageEmployee /> }];

export default ManageEmployeeRoutes;
