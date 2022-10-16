import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../contexts/user";

import LoginForm from "../../components/Forms/LoginForm";

export default function LoginPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const user = useUser();

  function handleLogin(e) {
    e.preventDefault();
    // do backend stuff
    const data = Object.fromEntries(new FormData(e.target));
    fetch(`${process.env.REACT_APP_ORIGIN}/api/login`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status === 400) {
          setErrors('Username and Password must both be provided');
          return;
        }
        if (res.status === 401) {
          setErrors('Incorrect Username or Password');
          return;
        }
        return res.json()
      })
      .then(res => {
        if (res.user) {
          user.setUser(res.user);
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div className='w-full mt-5'>
      <LoginForm onSubmit={handleLogin} errors={errors} />
    </div>
  )
}
