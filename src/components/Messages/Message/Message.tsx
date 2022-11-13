import type { Message } from "../../../types";
import MessageHeader from "./MessageHeader";
import MessageBody from "./MessageBody";


export default function Message({ id, username, title, body, timestamp, refetchMessages }: Message) {
  return (
      <div className='flex flex-col text-white mb-5 border border-1 border-gray-500 rounded-md'>
        <MessageHeader
          id={id}
          username={username}
          title={title}
          timestamp={timestamp}
          refetchMessages={refetchMessages}
        />
        <MessageBody body={body} />
      </div>
  )
}
