import Loadable from "app/components/Loadable";
import { lazy } from "react";

const Approval = Loadable(lazy(() => import("./Approval")));

const ApprovalRoutes = [{ path: "/approval", element: <Approval /> }];

export default ApprovalRoutes;
