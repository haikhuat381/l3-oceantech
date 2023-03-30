import Loadable from "app/components/Loadable";
import { lazy } from "react";

const Approved = Loadable(lazy(() => import("./Approved")));

const ApprovedRoutes = [{ path: "/approved", element: <Approved /> }];

export default ApprovedRoutes;
