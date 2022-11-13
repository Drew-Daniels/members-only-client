import {useEffect, PropsWithChildren} from "react";
import {useUser} from "../../contexts/user";

export function AuthWrapper({ children }: PropsWithChildren) {
  const { setUser } = useUser();

  useEffect(() => {
    checkAuth();

    function checkAuth() {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth`, {
      })
        .then(res => res.json())
        .then(res => {
          if (res.user) {
            setUser(res.user);
          }
        })
    }
  }, []);

  return (
    <>
      {children}
    </>
  )
}
