import {useState, createContext, useContext, PropsWithChildren, SetStateAction, Dispatch} from "react";

interface IUser {
  username: string;
  avatarUrl: string;
}

interface IUserContext {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  resetUser: Dispatch<SetStateAction<IUser>>;
}

const UserContext = createContext<IUserContext | null>(null);

const DEFAULT_USER: IUser = {
  username: 'Guest',
  avatarUrl: 'https://members-only-media.s3.amazonaws.com/images/avatars/avatar-8.svg',
}

function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<IUser>(DEFAULT_USER)!;
  function resetUser() {
    setUser(DEFAULT_USER);
  }
  const value = { user, setUser, resetUser }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser() {
  return useContext(UserContext);
}

export { UserProvider, useUser };
