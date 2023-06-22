import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import cookie from 'js-cookie';
// import { useSession } from "next-auth/react";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  // const { data: session, status } = useSession();

  let user_cookie: any = cookie.get('userCookie');
  let token: any, email: any;
  if(user_cookie){
    user_cookie = JSON.parse(user_cookie);
    token = user_cookie.token;
    email = user_cookie.email;
  }

  const videoRef = useRef<HTMLInputElement|null>(null)
  const titleRef = useRef<HTMLInputElement|null>(null)
  let videoId = "";
  let formData = new FormData();
  const [pressed, setPressed] = useState(false);

  const submitData = async (e: React.SyntheticEvent) => {
    setPressed(true);
    e.preventDefault();
    if(!formData.keys().next().done){
      setLoading(true);
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData
        });
        const data = await response.json();
        videoId = data.public_id;
      } catch (error) {
        console.error(error);
      }
      finally{
        setLoading(false);
      }
    }
    try {
      const body = { title, content, videoId, token, email };
      const res = await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if(res.status === 200){
        await Router.push("/drafts");
      }
      else{
        await res.json().then(error => alert(error.error));
        await Router.push("/");
      }
    } catch (error) {
      console.error("error");
    }
  };
  
  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files && event.target.files[0];
    if (file){
      formData.append("inputFile", file);
    }
  };

  const handleDeleteVideo = () =>{
    if(videoRef.current)
      videoRef.current.value="";
    formData = new FormData();
  }
  useEffect(()=>{
    if(titleRef.current)
      titleRef.current.focus();
  },[])

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
            ref={titleRef}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title || pressed || loading } type="submit" value="Create" className="create-button" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
          {loading && <a>Loading...</a>}
        </form>
        <span className="mt-2 text-base text-black leading-normal">
          Select a video: 
        </span>            
        <input type="file" ref={videoRef}  onChange={handleVideoUpload} className="hidden" />
        <button className="delete-video" onClick={() => handleDeleteVideo()}>Delete File</button>  
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }
        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }
        .back {
          margin-left: 1rem;
        }
        .create-button {
          transition: background-color 0.3s ease-in-out;
        }
        .create-button:hover {
          background-color: #ccc;
        }
        .create-button:active {
          background-color: #ececec;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
