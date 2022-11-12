import {useState, createContext, useContext, ReactNode, PropsWithChildren} from "react";

const UserContext = createContext();

const DEFAULT_USER = {
  username: 'Guest',
  avatarUrl: 'https://members-only-media.s3.amazonaws.com/images/avatars/avatar-8.svg',
}

function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(DEFAULT_USER);
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
