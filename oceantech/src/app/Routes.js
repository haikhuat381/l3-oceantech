import Layout from "./components/Layout/Layout";

import NotFound from "./components/NotFound";
import AddNewEmployeeRoutes from "./views/AddNewEmployee/AddNewEmployeeRoutes";
import ManageEmployeeRoutes from "./views/ManageEmployee/ManageEmployeeRoutes";
import ReleaseRoutes from "./views/Release/ReleaseRoutes";
import ApprovedRoutes from "./views/Approved/ApprovedRoutes";
import ApprovalRoutes from "./views/Approval/ApprovalRoutes";
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      ...ManageEmployeeRoutes,
      ...AddNewEmployeeRoutes,
      ...ReleaseRoutes,
      ...ApprovalRoutes,
      ...ApprovedRoutes,
    ],
  },

  { path: "*", element: <NotFound /> },
];

export default routes;
