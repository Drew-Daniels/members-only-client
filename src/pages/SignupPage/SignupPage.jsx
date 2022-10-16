import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../../components/Forms/SignupForm";
import { useUser } from "../../contexts/user";

export default function SignupPage() {
  const { setUser } = useUser();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    // do backend stuff
    const data = Object.fromEntries(new FormData(e.target));
    fetch('https://members-only-api-qo64sidtta-uc.a.run.app/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status === 409) {
          setErrors([{ param: 'username', msg: 'A user with that username already exists!' }]);
          return;
        }
        return res.json()
      })
      .then(res => {
        if (res.errors) {
          setErrors(res.errors);
          return;
        }
        setUser(res.user);
        navigate('/');
      })
      .catch(err => console.error(err));
  }

  return (
    <div className='w-full mt-5'>
      <SignupForm onSubmit={onSubmit} errors={errors} />
    </div>
  )
}
