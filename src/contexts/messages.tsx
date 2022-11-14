import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {Message} from "../types";
import { useUser } from "./user";

interface MessagesContext {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  refetchMessages: () => void;
}

type MessagesProviderProps = { children: ReactNode };

const MessagesContext = createContext<MessagesContext | undefined>(undefined);

function MessagesProvider({ children }: MessagesProviderProps) {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const value = { messages, setMessages, refetchMessages };

  useEffect(() => {
    loadMessages();

    function loadMessages() {
      fetch(`/api/messages`)
        .then(res => res.json())
        .then(res => {
          setMessages(res.messages)
        })
    }
  }, [user]);

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  )

  function refetchMessages() {
    fetch(`/api/messages`, {
    })
      .then(res => res.json())
      .then(res => {
        setMessages(res.messages)
      })
  }
}

function useMessages() {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('"useMessages" must be used within a MessagesProvider');
  }
  return context;
}

export { MessagesProvider, useMessages };
