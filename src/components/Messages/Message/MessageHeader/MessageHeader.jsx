import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useUser } from '../../../../contexts/user';

export default function MessageHeader({ id, username, title, timestamp, refetchMessages }) {
  const { user } = useUser();

  function handleDeleteMessage() {
    fetch('https://members-only-api-qo64sidtta-uc.a.run.app/api/messages/' + id, {
      method: 'DELETE',
    }).then(refetchMessages)
  }

  function getFormattedDateFromTimestamp(timeStampString) {
    return dayjs(timeStampString).format('MM/DD/YYYY h:mm A');
  }

  return (
    <div id={id} className='w-full max-w-xl bg-gray-800 px-4 pt-2 rounded-t-md flex justify-between items-center'>
      <div className='flex flex-grow flex-wrap mr-10'>
        <span className='font-bold text-orange-500 mr-1'>{title}</span>
        <span className='mr-1'> by </span>
        <span className='text-orange-500 mr-1'>{username}</span>
        <span className='mr-1'> at </span>
        <span className='text-orange-500'>{getFormattedDateFromTimestamp(timestamp)}</span>
      </div>
      {user.isAdmin &&
        <button onClick={handleDeleteMessage} className='nav-link bg-[#fc5f0a] py-2 px-4 rounded inline-flex items-center mr-1'>
          <FontAwesomeIcon icon={faTrash} color='#FFFFFF'/>
        </button>
      }
    </div>
  )
}
