import { SetStateAction, Dispatch } from "react";
import ContextFactory from "./utils";
import type {User} from "../types";

export interface UserContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  resetUser: Function;
}

export const [useUser, UserProvider] = ContextFactory<UserContext>();
