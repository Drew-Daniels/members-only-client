import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/user";
import {MembershipForm} from "../../components/Forms/MembershipForm";

export default function MembershipPage() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  return (
    <div className='w-full mt-5'>
      <MembershipForm setUser={setUser} navigate={navigate}/>
    </div>
  )
}
