import Loadable from "app/components/Loadable";
import { lazy } from "react";

const ReleaseEmployee = Loadable(lazy(() => import("./ReleaseEmployee")));

const ReleaseRoutes = [{ path: "/release", element: <ReleaseEmployee /> }];

export default ReleaseRoutes;
