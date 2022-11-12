import {ReactNode} from "react";

interface IProps {
  children: ReactNode;
}

export default function Main({ children }: IProps) {

  return (
    <main className='flex flex-grow w-10/12'>
      {children}
    </main>
  )
}
