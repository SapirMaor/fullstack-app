import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from '../../lib/prisma'
// import { useSession } from "next-auth/react";
import cookie from 'js-cookie';
import Video from "../../components/Video";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post ?? { author: { name: "Me" } }
  };
};

async function publishPost(id: number): Promise<void> {
  const res = await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  if(res.status === 200){
    await Router.push("/");
  }
  else{
    await res.json().then(error => alert(error.error));
    await Router.push("/");
  }
}

async function deletePost(id: number): Promise<void> {
  const res = await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  if(res.status === 200){
    await Router.push("/");
  }
  else{
    await res.json().then(error => alert(error.error));
    await Router.push("/");
  }
}

const Post: React.FC<PostProps> = (props) => {
  const [userHasValidSession, setUserHasValidSession] = useState(false);
  const [postBelongsToUser, setPostBelongsToUser] = useState(false);

  useEffect(() => {
    const user_cookie = cookie.get('userCookie');
    if (user_cookie) {
      const parsedCookie = JSON.parse(user_cookie);
      const { token, email } = parsedCookie;
      setUserHasValidSession(Boolean(token));
      setPostBelongsToUser(email === props.author?.email);
    }
  }, []);

  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        <Video publicId={props.videoId}/>
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => deletePost(props.id)}>Delete</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
