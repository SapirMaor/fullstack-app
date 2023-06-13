import React, {useState, useRef, useEffect} from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { error } from "console";

const userSignInForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [pressed, setPressed] = useState(false);

    const submitData = async (e: React.SyntheticEvent) => {
        setPressed(true);
        e.preventDefault();
        try {
          const body = { username, password }; // TODO: add a session
          const res = await fetch(`/api/signin`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if(res.status === 200){
            await Router.push("/");
          }
          else{
            await res.json().then(error => alert(error.error));
            await Router.push("/signInForm");
            setUsername("");
            setPassword("");
            setPressed(false);
          }
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <Layout>
          <div>
            <form onSubmit={submitData}>
              <h1>Sign In</h1>
              <input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                type="text"
                value={username}
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="text"
                value={password}
              />              
              <input disabled={!username || !password || pressed} type="submit" value="Login" className="create-button" />
              <a className="back" href="#" onClick={() => Router.push("/")}>
                or Cancel
              </a>
            </form>
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

export default userSignInForm;