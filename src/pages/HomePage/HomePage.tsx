import {MessageForm} from "../../components/Forms/MessageForm";
import Messages from "../../components/Messages";
import {useUser} from "../../contexts/user";
import type {Message} from "../../types";

interface Props {
  messages: Message[];
  refetchMessages: () => void;
}

export default function HomePage({ messages, refetchMessages }: Props) {
  const { user } = useUser();
  return (
    <div className='pt-5 flex-col flex-grow'>
      {user.username !== 'Guest' &&
        <MessageForm userId={user._id} refetchMessages={refetchMessages} />
      }
      <Messages messages={messages} refetchMessages={refetchMessages} />
    </div>
  )
}
