import { useState } from 'react';
import MessageForm from "../../components/Forms/MessageForm";
import Messages from "../../components/Messages";
import {useUser} from "../../contexts/user";

export default function HomePage({ messages, refetchMessages }) {
  const { user } = useUser();
  const [errors, setErrors] = useState([]);

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.author = user._id;
    fetch('https://members-only-api-qo64sidtta-uc.a.run.app/api/messages', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.errors) {
          setErrors(res.errors);
          return;
        }
        return refetchMessages();
      })
      .catch(err => console.error(err));
  }

  return (
    <div className='pt-5 flex-col flex-grow'>
      {user.username !== 'Guest' &&
        <MessageForm onSubmit={onSubmit} errors={errors} />
      }
      <Messages messages={messages} refetchMessages={refetchMessages} />
    </div>
  )
}
