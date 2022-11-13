import { useState } from 'react';
import MessageForm from "../../components/Forms/MessageForm";
import Messages from "../../components/Messages";
import {useUser} from "../../contexts/user";
import type { Message } from "../../types";

interface Props {
  messages: Message[];
  refetchMessages: Function;
}

export default function HomePage({ messages, refetchMessages }: Props) {
  const { user } = useUser();
  const [errors, setErrors] = useState<string[]>([]);

  function onSubmit(e: Event) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    data.author = user._id;
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/messages`, {
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
