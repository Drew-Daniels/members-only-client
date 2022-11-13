import {MessageForm} from "../../components/Forms/MessageForm";
import Messages from "../../components/Messages";
import {useUser} from "../../contexts/user";
import {useMessages} from "../../contexts/messages";

export default function HomePage() {
  const { user } = useUser();
  const { messages, refetchMessages } = useMessages();
  return (
    <div className='pt-5 flex-col flex-grow'>
      {user.username !== 'Guest' &&
        <MessageForm userId={user._id} refetchMessages={refetchMessages} />
      }
      <Messages messages={messages} refetchMessages={refetchMessages} />
    </div>
  )
}
