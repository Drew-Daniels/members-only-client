interface FormError {
  param: string;
  msg: string;
}

interface User {
  _id: string;
  username: string;
  avatarUrl: string;
  isAdmin: boolean;
}

interface Message {
  // reconcile id fields
  _id: string;
  id: string;
  author: {
    username: string;
  }
  title: string;
  body: string;
  timestamp: string;
  refetchMessages: Function;
  updatedAt: string;
}

export type { FormError, Message, User };
