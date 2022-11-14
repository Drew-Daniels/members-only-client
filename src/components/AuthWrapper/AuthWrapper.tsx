import {useEffect, PropsWithChildren} from "react";
import {useUser} from "../../contexts/user";

export default function AuthWrapper({ children }: PropsWithChildren) {
  const { setUser } = useUser();

  useEffect(() => {
    checkAuth();

    function checkAuth() {
      fetch(`/api/auth`, {
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
