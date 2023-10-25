import { FunctionComponent } from "react";
import Auth from "~/components/Auth";
import Lesson from "~/components/Lesson/Lesson";

type Route = {
  path: string;
  element: FunctionComponent;
};

/**
 * Route can be accessed without logging
 */
const publicRoutes: Route[] = [
  { path: "/", element: Auth },
  { path: "/lesson", element: Lesson },
];

/**
 * Route can not be accessed without logging
 */
const privateRoutes: Route[] = [];

export { publicRoutes, privateRoutes };
