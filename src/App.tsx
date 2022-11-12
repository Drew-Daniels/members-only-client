import React, { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from "./pages/Logout";
import MembershipPage from "./pages/MembershipPage/MembershipPage";
import MetadataContext from './contexts/metadata';
import {useUser} from "./contexts/user.tsx";
import './index.css';

const Metadata = {
  title: 'Members Only',
  author: 'Drew Daniels',
  githubUrl: 'https://github.com/Drew-Daniels/members-only',
};

function App() {
  const { user, setUser } = useUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    checkAuth();

    function checkAuth() {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth`, {
      })
        .then(res => res.json())
        .then(res => {
          if (res.user) {
            setUser(res.user);
          }
        })
    }
  }, []);

  useEffect(() => {
    loadMessages();

    function loadMessages() {
      // get data from backend api
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/messages`, {
      })
        .then(res => res.json())
        .then(res => {
          setMessages(res.messages)
        })
    }
  // TODO: Reload messages from api when user state changes
  }, [user]);

  function refetchMessages() {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/messages`, {
    })
      .then(res => res.json())
      .then(res => {
        setMessages(res.messages)
      })
  }

  return (
    <div className='App'>
      <MetadataContext.Provider value={Metadata}>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage messages={messages} refetchMessages={refetchMessages}/>} />
            <Route path='/signup' element={<SignupPage />}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/membership' element={<MembershipPage />} />
            <Route path='/logout' element={<LogoutPage />} />
          </Routes>
        </Layout>
      </MetadataContext.Provider>
    </div>
  );
}

export default App;
