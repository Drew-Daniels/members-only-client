import {LogoutForm} from "../../components/Forms/LogoutForm";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../contexts/user";

export default function LogoutPage() {
  const navigate = useNavigate();
  const { resetUser } = useUser();
  return (
    <LogoutForm navigate={navigate} resetUser={resetUser}/>
  )
}
