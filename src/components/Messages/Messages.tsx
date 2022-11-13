import MessageComponent from "./Message";
import type { Message } from "../../types";

interface Props {
  messages: Message[];
  refetchMessages(): void;
}

export default function Messages({ messages, refetchMessages }: Props) {
  return (
    <ul className='flex-col justify-center'>
      {messages.map(({_id, author, title, body, updatedAt}) =>
        <li key={_id} className='flex-col justify-center'>
          <MessageComponent
            id={_id}
            author={author}
            title={title}
            body={body}
            timestamp={updatedAt}
            refetchMessages={refetchMessages}
          />
        </li>
      )}
    </ul>
  )
}
