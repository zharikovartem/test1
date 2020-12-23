import React, { useState, useEffect } from 'react';
import { Spin, Space, Button } from 'antd';

const UserPage = (props) => {
    const [logout, setLogout] = useState(false);

    useEffect(() => {
        if (logout) {
            const baseURL = 'https://tager.dev.ozitag.com/api/tager/user/profile/logout/';
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            };

            fetch(baseURL, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        props.isLogined(false)
                        localStorage.clear()
                    }
                }
                );
        }
    }, [logout, props])

    const logoutHandle = () => {
        setLogout(true)
    }

    return (
        <div>
            {!props.userProfile ?
                <Space>
                    <Spin size="large" />
                </Space>

                :
                <>
                    <h4>UserPage</h4>
                    <p>name: {props.userProfile.name}</p>
                    <p>email: {props.userProfile.email}</p>
                </>
            }
            <Button type="primary" onClick={logoutHandle} >Выйти</Button>
        </div>
    )
}

export default UserPage;