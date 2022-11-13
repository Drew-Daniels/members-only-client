import { useNavigate } from "react-router-dom";
import {SignupForm} from "../../components/Forms/SignupForm";
import { useUser } from "../../contexts/user";

export default function SignupPage() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  return (
    <div className='w-full mt-5'>
      <SignupForm setUser={setUser} navigate={navigate} />
    </div>
  )
}
