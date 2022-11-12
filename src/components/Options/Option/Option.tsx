import { Link } from "react-router-dom";

interface IProps {
  text: string;
  urlPath: string;
}

export default function Option({ text, urlPath }: IProps) {
  return (
    <li className='nav-link bg-[#fc5f0a] py-2 px-4 rounded inline-flex items-center mr-1'>
      <Link to={urlPath} className='text-white'>{text}</Link>
    </li>
  )
}
