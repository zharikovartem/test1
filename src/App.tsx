import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Login from './Login';
import UserPage from './UserPage';
import { Spin } from 'antd';


const App = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [userProfile, setUserProfile] = useState(false)
  const [spin, setSpin] = useState(false)

  useEffect(() => {
    if (isAuth === null || !userProfile) {
      if (localStorage.getItem('accessToken')) {
        setSpin(true)
        const baseURL = 'https://tager.dev.ozitag.com/api/tager/user/profile/';
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
          },
        };

        fetch(baseURL, requestOptions)
          .then(response => response.json())
          .then(data => {
            setUserProfile(data.data)
            setIsAuth(true)
            setSpin(false)
          }
          );
      }
    }
  }, [isAuth])

  const isLogined = (isLogin: boolean) => {
    setIsAuth(isLogin)
  }

  if (spin) {
    return (
        <Spin size="large" />
    )
  }
  return (
    <div className="container">
      {!isAuth ?
        <Login isLogined={isLogined} />
        // <div>1</div>
        :
        <UserPage isLogined={isLogined} userProfile={userProfile} />
        // <div>2</div>
      }

    </div>
  );
}

export default App;
