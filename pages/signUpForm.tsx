import React, {useState, useRef, useEffect} from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const userSignUpForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const usernameRef = useRef<HTMLInputElement|null>(null)
    const [pressed, setPressed] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitData = async (e: React.SyntheticEvent) => {
        setPressed(true);
        e.preventDefault();
        setLoading(true);
        try {
          const body = { username, password, email, name };
          const res = await fetch(`/api/signup`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if(res.status === 201){
            await Router.push("/");
          }
          else{
            await res.json().then(error => alert(error.error));
            await Router.push("/signUpForm");
            setEmail("");
            setPressed(false);
          }
        } catch (error) {
          console.error(error);
        } finally{
          setLoading(false);
        }
      };

    useEffect(()=>{
        if(usernameRef.current)
        usernameRef.current.focus();
      },[])

    return (
        <Layout>
          <div>
            <form onSubmit={submitData}>
              <h1>Sign Up Form</h1>
              <input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                type="text"
                value={username}
                ref={usernameRef}
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="text"
                value={password}
              />              
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="text"
                value={email}
              />
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                type="text"
                value={name}
              />

              <input disabled={!username || !password || !email || !name || pressed || loading } type="submit" value="Create User" className="create-button" />
              <a className="back" href="#" onClick={() => Router.push("/")}>
                or Cancel
              </a>
              {loading && <a>loading...</a>}
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

export default userSignUpForm;