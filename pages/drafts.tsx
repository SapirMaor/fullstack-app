import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma'
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
const jwt = require('jsonwebtoken');

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const cookies = parseCookies(context);
  let user_cookie;
  if (cookies.userCookie) {
    user_cookie = JSON.parse(cookies.userCookie);
  }
  const token = user_cookie?.token;
  const email = user_cookie?.email;

  if (!token) {
    res.statusCode = 403; // Forbidden
    return { props: { drafts: [] } };
  }

  const decToken = jwt.verify(token, process.env.SECRET);
  if (!decToken.id) {
    res.statusCode = 401; // Unauthorized
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const [drafts, setDrafts] = useState<PostProps[]>(props.drafts);

  useEffect(() => {
    const user_cookie: any = cookie.get('userCookie');
    const token: any = user_cookie ? JSON.parse(user_cookie).token : null;

    if (!token && typeof window !== 'undefined') {
      // Redirect on the client side if not authenticated
      window.location.href = "/";
      return;
    }

    setDrafts(props.drafts);
  }, [props.drafts]);

  if (!drafts) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (drafts.length === 0) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>No drafts found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
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
};

export default Drafts;

