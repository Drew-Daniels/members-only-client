import {ReactNode} from "react";

interface Props {
  children: ReactNode;
}

export default function Main({ children }: Props) {

  return (
    <main className='flex flex-grow w-10/12'>
      {children}
    </main>
  )
}
