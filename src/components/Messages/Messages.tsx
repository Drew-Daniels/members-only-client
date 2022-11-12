import Message from "./Message";

interface Message {
  _id: string;
  author: {
    username: string;
  }
  title: string;
  body: string;
  updatedAt: Date;
}

interface IProps {
  messages: Message[];
  refetchMessages: Function;
}

export default function Messages({ messages, refetchMessages }: IProps) {
  return (
    <ul className='flex-col justify-center'>
      {messages.map(({_id, author, title, body, updatedAt}) =>
        <li key={_id} className='flex-col justify-center'>
          <Message
            id={_id}
            username={author.username}
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
