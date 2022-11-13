import Logo from '../Logo';
import Options from "../Options";
import ProfilePill from "../ProfilePill";
import Title from "../Title";
import { useUser } from "../../contexts/user";
import {useMetadata} from "../../contexts/metadata";

export default function Navbar() {
  const { title } = useMetadata();
  const {user: { username }} = useUser();
  return (
    <div className='bg-gray-800 flex justify-center border border-1 border-gray-500 rounded-md'>
      <div className='flex flex-grow justify-around w-full items-center'>
        <Logo />
        <Title title={title} />
        <Options />
        <ProfilePill username={username} />
      </div>
    </div>
  )
}
