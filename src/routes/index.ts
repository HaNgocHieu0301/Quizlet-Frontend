import { FunctionComponent } from "react";
import Home from "~/pages/Home";
import FlashCardMode from "~/pages/LessonModes/FlashCardMode";
import LearningMode from "~/pages/LessonModes/LearningMode";
import Lesson from "~/pages/LessonModes/Lesson";
import EditingMode from "~/pages/LessonModes/EditingMode";
import Recover from "~/pages/Recover";
import CreateSet from "~/pages/Set/CreateSet";
import Profile from "~/pages/Profile";

type Route = {
  path: string;
  element: FunctionComponent;
  auth?: boolean;
  role?: string;
};

/**
 * Route can be accessed without logging
 */
const publicRoutes: Route[] = [
  { path: "/Lesson/:lessonId", element: Lesson },
  {
    path: "/Lesson/FlashCardMode/:lessonId",
    element: FlashCardMode,
  },
  { path: "/Lesson/LearningMode/:lessonId", element: LearningMode },
  { path: "/Lesson/EditingMode/:lessonId", element: EditingMode, auth: true },
  { path: "/Profile", element: Profile, auth: true },
  { path: "/", element: Home },
  { path: "/recover", element: Recover },
  { path: "/create-set", element: CreateSet, auth: true },
];

/**
 * Route can not be accessed without logging
 */
const privateRoutes: Route[] = [];

export { publicRoutes, privateRoutes };
