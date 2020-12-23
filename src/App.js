import React, {useState, useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Login from './Login';
import UserPage from './UserPage';

const App = () => {
  const [isAuth, setIsAuth] = useState(null);
  const [userProfile, setUserProfile] = useState(false)

  useEffect(() => {
    if (isAuth === null || !userProfile) {
      if (localStorage.getItem('accessToken')) {
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
                    console.log(data)
                        setUserProfile(data.data)
                        setIsAuth(true)
                    }
                );
      }
    }
  }, [isAuth])
  
  const isLogined = (isLogin) => {
    setIsAuth(isLogin)
  }
 
  return (
    <div className="container">
      {!isAuth ?
        <Login isLogined = {isLogined} />
      :
        <UserPage isLogined = {isLogined} userProfile = {userProfile}/>
      }
      
    </div>
  );
}

export default App;
