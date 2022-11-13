interface IFormError {
  param: string;
  msg: string;
}

interface IUser {
  username: string;
  avatarUrl: string;
  isAdmin: boolean;
}

interface IMessage {
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
}

export type { IFormError, IMessage, IUser };
