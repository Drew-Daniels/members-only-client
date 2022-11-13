import MessageHeader from "./MessageHeader";
import MessageBody from "./MessageBody";

interface Props {
  id: string;
  author: {
    username: string;
  };
  title: string;
  body: string;
  timestamp: string;
  refetchMessages: () => void;
}

export default function Message({ id, author, title, body, timestamp, refetchMessages }: Props) {
  return (
      <div className='flex flex-col text-white mb-5 border border-1 border-gray-500 rounded-md'>
        <MessageHeader
          id={id}
          username={author.username}
          title={title}
          timestamp={timestamp}
          refetchMessages={refetchMessages}
        />
        <MessageBody body={body} />
      </div>
  )
}
