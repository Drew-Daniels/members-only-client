import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import {UserProvider} from "./contexts/user";
import type { IUser } from "./types";

const DEFAULT_USER: IUser = {
  username: 'Guest',
  avatarUrl: 'https://members-only-media.s3.amazonaws.com/images/avatars/avatar-8.svg',
  isAdmin: false,
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider value={DEFAULT_USER}>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
