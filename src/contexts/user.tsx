import {SetStateAction, Dispatch, ReactNode, createContext, useState, useContext} from "react";
import type {User} from "../types";

export interface UserContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  resetUser: Function;
}

const DEFAULT_USER: User = {
  _id: '',
  username: 'Guest',
  avatarUrl: 'https://members-only-media.s3.amazonaws.com/images/avatars/avatar-8.svg',
  isAdmin: false,
}

type UserProviderProps = { children: ReactNode };

const UserContext = createContext<UserContext | undefined>(undefined)

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(DEFAULT_USER)
  const value = { user, setUser, resetUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );

  function resetUser() {
    setUser(DEFAULT_USER);
  }
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUser };
