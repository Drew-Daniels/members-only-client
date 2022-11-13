import {useNavigate} from "react-router-dom";
import {useUser} from "../../contexts/user";

import {LoginForm} from "../../components/Forms/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  return (
    <div className='w-full mt-5'>
      <LoginForm setUser={setUser} navigate={navigate} />
    </div>
  )
}
