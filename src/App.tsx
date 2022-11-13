import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from "./pages/Logout";
import MembershipPage from "./pages/MembershipPage/MembershipPage";
import {UserProvider} from "./contexts/user";
import {MessagesProvider} from "./contexts/messages";
import './index.css';
import AuthWrapper from "./components/AuthWrapper";

function App() {
  return (
    <div className='App'>
      <UserProvider>
        <AuthWrapper>
          <MessagesProvider>
            <Layout>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/signup' element={<SignupPage />}/>
                <Route path='/login' element={<LoginPage />}/>
                <Route path='/membership' element={<MembershipPage title='Join' />} />
                <Route path='/logout' element={<LogoutPage />} />
              </Routes>
            </Layout>
          </MessagesProvider>
        </AuthWrapper>
      </UserProvider>
    </div>
  );
}

export default App;
