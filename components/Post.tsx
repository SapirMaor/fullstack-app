import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { useState, useContext, useEffect } from "react";
import Video from "../components/Video";
import { FiPlayCircle, FiSun, FiMoon } from "react-icons/fi";
import { lightContext } from "../pages/lightContext";


export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  videoId: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const isDarkMode = useContext(lightContext);
  const [isPostDarkMode, setIsPostDarkMode] = useState(isDarkMode);

  useEffect(() => {
    setIsPostDarkMode(isDarkMode);
  }, [isDarkMode]);

  const addVideoIcon = () => {
    if (post.videoId) {
      return <FiPlayCircle className="video-icon" style={{ fontSize: "1.5rem" }} />;
    }
    return null;
  };

  return (
    <div className={`post ${isPostDarkMode ? "dark" : "light"}`} onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>  
      <h2>{post.title} {addVideoIcon()}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <Video publicId={post.videoId}/>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
        .post {
          color: inherit;
          padding: 2rem;
        }
        .post.dark {
          background-color: black;
          color: white;
          border: 1px solid white;
        }
        .post.light {
          background-color: white;
          color: black;
        }
      `}</style>
    </div>

  );
};

export default Post;
