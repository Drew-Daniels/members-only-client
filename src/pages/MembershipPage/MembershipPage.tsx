import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/user";
import {MembershipForm} from "../../components/Forms/MembershipForm/MembershipForm";

interface Props {
  title: string;
}

export default function MembershipPage({ title }: Props) {
  const { setUser } = useUser();
  const navigate = useNavigate();
  return (
    <div>
      <h2>{title}</h2>
      <MembershipForm setUser={setUser} navigate={navigate}/>
    </div>
  )
}
