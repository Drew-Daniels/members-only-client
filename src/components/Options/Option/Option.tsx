import { Link } from "react-router-dom";

interface Props {
  text: string;
  urlPath: string;
}

export default function Option({ text, urlPath }: Props) {
  return (
    <li className='nav-link bg-[#fc5f0a] py-2 px-4 rounded inline-flex items-center mr-1'>
      <Link to={urlPath} className='text-white'>{text}</Link>
    </li>
  )
}
