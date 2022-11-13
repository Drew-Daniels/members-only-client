import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/user";
import MembershipForm from "../../components/Forms/MembershipForm";
interface Props {
  title: string;
}

export default function MembershipPage({ title }: Props) {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  function handleSubmit(e: Event) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    // fetch secret code from backend
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/membership`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
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
