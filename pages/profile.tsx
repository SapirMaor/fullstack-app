import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import cookie from 'js-cookie';
const jwt = require('jsonwebtoken');

interface UserData {
  token: any;
  email: any;
  name: any;
  username: any;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const userCookie = cookie.get('userCookie');
    if (userCookie) {
      const { token, email, name, username } = JSON.parse(userCookie);
      setUserData({ token, email, name, username });
    }
  }, []);

  if (!userData || !userData.token) {
    return (
      <Layout>
        <h1>My Profile</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  const { name, username, email } = userData;

  return (
    <Layout>
      <div className="page">
        <h1>My Profile</h1>
        <h4>Name: {name}</h4>
        <h4>Username: {username}</h4>
        <h4>Email: {email}</h4>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
}

export default Profile;

