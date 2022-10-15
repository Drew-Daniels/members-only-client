import Message from "./Message";

export default function Messages({ messages, refetchMessages }) {
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