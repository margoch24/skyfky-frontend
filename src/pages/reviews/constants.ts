import { UserType } from "common/types";

export type ReviewType = {
  id: string;
  user_id: string;
  message: string;
  rating: number;

  user: UserType;
};
