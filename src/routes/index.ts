import { FunctionComponent } from "react";
import Home from "~/pages/Home/Home";
import Recover from "~/pages/Recover";

type Route = {
  path: string;
  element: FunctionComponent;
};

/**
 * Route can be accessed without logging
 */
const publicRoutes: Route[] = [
  { path: "/", element: Home },
  { path: "/recover", element: Recover },
];

/**
 * Route can not be accessed without logging
 */
const privateRoutes: Route[] = [];

export { publicRoutes, privateRoutes };
