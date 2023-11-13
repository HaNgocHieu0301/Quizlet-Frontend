import { JwtPayload } from "jwt-decode";

type subModalRef = {
  show: Function;
};

type userInfo = {
  email: string;
  username: string;
  password: string;
  role: string;
};

type Lesson = {
  lessonId: number;
  title: string;
  description: string;
  createAt: Date;
  modifiedAt: Date;
  visibleId: number;
  folderId: number;
  rate: number;
  userId: string;
};
export type { subModalRef, userInfo, Lesson };
