// import React, { useState } from 'react';
import React from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Nav = () => {
  //   const [username, setUsername] = useState('');
  //   const [email, setEmail] = useState('');
  //   const [phonenumber, setPhonenumber] = useState('');

  const handleClickProfile = () => {
    Axios.get('/account/profile', {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }).then((res) => {
      console.log(res);
      //   setUsername(res.data.username);
      //   setEmail(res.data.email);
      //   setPhonenumber(res.data.phonenumber);
    });
  };

  const handleClickBoard = () => {
    Axios.get('/board', {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <Link to="/">
        <button type="button">Main</button>
      </Link>
      <Link to="/account/login">
        <button type="button">Login</button>
      </Link>
      <Link
        to={{
          pathname: '/account/profile',
          data: {
            username: 'aaa',
            email: 'bbb',
            phonenumber: 'ccc',
          },
        }}
      >
        <button type="button" onClick={handleClickProfile}>
          Profile
        </button>
      </Link>
      <Link to="/board">
        <button type="button" onClick={handleClickBoard}>
          Board
        </button>
      </Link>
    </>
  );
};

export default Nav;
