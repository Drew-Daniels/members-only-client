import { SetStateAction, Dispatch } from "react";
import ContextFactory from "./utils";
import type {IUser} from "../types";

interface IUserContext {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  resetUser: Function;
}

export const [useUser, UserProvider] = ContextFactory<IUserContext>();
