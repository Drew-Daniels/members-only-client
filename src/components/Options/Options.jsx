import { useUser } from "../../contexts/user";
import Option from "./Option";

export default function Options() {
    const { user } = useUser();
    return (
      <>
        <div className='collapse navbar-collapse' />
        <ul className='navbar-nav'>
          <Option text='Home' urlPath='/' />
          {user.username === 'Guest' &&
            <>
              <Option text='Login' urlPath='/login' />
              <Option text='Signup' urlPath='/signup' />
            </>
          }
          {user.username !== 'Guest' &&
            <Option text='Logout' urlPath='/logout' />
          }
          {user.isAdmin === false &&
            <Option text='Become an Admin' urlPath='/membership' />
          }
        </ul>
      </>
    )
}