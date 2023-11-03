import { FunctionComponent } from "react";
import Auth from "~/components/Auth";
import FlashCardMode from "~/components/Modes/FlashCardMode";
import LearningMode from "~/components/Modes/LearningMode";
import Lesson from "~/components/Lesson/Lesson";
import EditingMode from "~/components/Modes/EditingMode";

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
  { path: "/Lesson/FlashCardMode", element: FlashCardMode },
  { path: "/Lesson/LearningMode", element: LearningMode },
  { path: "/Lesson/EditingMode", element: EditingMode },
];

/**
 * Route can not be accessed without logging
 */
const privateRoutes: Route[] = [];

export { publicRoutes, privateRoutes };
