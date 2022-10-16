import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/user";
import MembershipForm from "../../components/Forms/MembershipForm";

export default function MembershipPage({ title, errors }) {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    // fetch secret code from backend
    fetch('https://members-only-api-qo64sidtta-uc.a.run.app/api/membership', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.status === 200) {
          // successful, update state
          setUser(prevUser => ({ ...prevUser, isAdmin: true }));
          navigate('/');
        } else {
          setError('Incorrect Secret Password');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <h2>{title}</h2>
      <MembershipForm onSubmit={handleSubmit} error={error} />
    </div>
  )
}
