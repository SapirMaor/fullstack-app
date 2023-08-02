import React, { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { signOut, useSession } from "next-auth/react";
import handle from "../pages/api/post";
import { useState, useContext , useEffect } from "react";
import { lightContext } from "../pages/lightContext";
import cookie from 'js-cookie';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const isDarkMode = useContext(lightContext);
  const [isHeaderDarkMode, setisHeaderDarkMode] = useState(isDarkMode);
  useEffect(() => {
    setisHeaderDarkMode(isDarkMode);
  });

  const [user, setUser] = useState<{ token: any; username: any; email: any; } | null>(null); 

  const getUserFromCookie = useCallback(() => {
    if (typeof window !== 'undefined') {
      const userCookie = cookie.get('userCookie');
      if (userCookie) {
        const { token, username, email } = JSON.parse(userCookie);
        return { token, username, email };
      }
    }
    return null;
  }, []);

  useEffect(() => {
    const user = getUserFromCookie();
    setUser(user);
  }, [getUserFromCookie]);

  const handleLogout = () => {
    cookie.remove('userCookie');
    setUser(null);
    router.push('/');
  };

  let left = (
    <div className={`left header ${isHeaderDarkMode ? "dark" : "light"}`}>
      <Link href="/" legacyBehavior>
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: ${isDarkMode ? "#FFFFFF" : "gray"};
        }

        a + a {
          margin-left: 1rem;
        }
        .header {
          color: inherit;
          padding: 2rem;
        }
        .header.dark {
          background-color: black;
          color: white;
        }
        .header.light {
          background-color: white;
          color: black;
        }
      `}</style>
    </div>
  );

  let right = null;

  // if (status === 'loading') {
    left = (
      <div className={`left header ${isHeaderDarkMode ? "dark" : "light"}`}>
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: ${isDarkMode ? "#FFFFFF" : "gray"};
          }

          a + a {
            margin-left: 1rem;
          }
          .header {
            color: inherit;
            padding: 2rem;
          }
          .header.dark {
            background-color: black;
            color: white;
          }
          .header.light {
            background-color: white;
            color: black;
          }
        `}</style>
      </div>
    );
    right = (
      <div className={`right header ${isHeaderDarkMode ? "dark" : "light"}`}>
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
          .header {
            color: inherit;
            padding: 2rem;
          }
          .header.dark {
            background-color: black;
            color: white;
          }
          .header.light {
            background-color: white;
            color: black;
          }
        `}</style>
      </div>
    );
  // }

  if (!user) {
    right = (
      <div className={`right header ${isHeaderDarkMode ? "dark" : "light"}`}>
        <Link href="/signInForm" legacyBehavior>
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
        <Link href="/signUpForm" legacyBehavior>
          <a data-active={isActive("/signup")}>Sign Up</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: ${isDarkMode ? "#FFFFFF" : "#000"};
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid ${isDarkMode ? "white" : "black"};
            padding: 0.5rem 1rem;
            border-radius: 3px;
            margin-right: 1rem;
          }
          .header {
            color: inherit;
            padding: 2rem;
          }
          .header.dark {
            background-color: black;
            color: white;
          }
          .header.light {
            background-color: white;
            color: black;
          }
        `}</style>
      </div>
    );
  }

  if (user) {
    left = (
      <div className={`left header ${isHeaderDarkMode ? "dark" : "light"}`}>
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <Link href="/drafts" legacyBehavior>
          <a data-active={isActive("/drafts")}>My drafts</a>
        </Link>
        <Link href="/profile" legacyBehavior>
          <a data-active={isActive("/profile")}>My profile</a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: ${isDarkMode ? "#FFFFFF" : "#000"};
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: ${isDarkMode ? "#FFFFFF" : "gray"};
          }

          a + a {
            margin-left: 1rem;
          }
          .header {
            color: inherit;
            padding: 2rem;
          }
          .header.dark {
            background-color: black;
            color: white;
          }
          .header.light {
            background-color: white;
            color: black;
          }
        `}</style>
      </div>
    );
    right = (
      <div className={`right header ${isHeaderDarkMode ? "dark" : "light"}`}>
        <p>
        {user.username} ({user.email})
        </p>
        <Link href="/create" legacyBehavior>
          <button>
            <a>New post</a>
          </button>
        </Link>
        <button onClick={handleLogout}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: ${isDarkMode ? "#FFFFFF" : "#000"};
            background-color: ${isDarkMode ? "black" : "white"};
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
            background-color: ${isDarkMode ? "black" : "white"};
            margin-right: 1rem;
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
            background-color: ${isDarkMode ? "black" : "white"};
          }
          .header {
            color: inherit;
            padding: 2rem;
          }
          .header.dark {
            background-color: black;
            color: white;
          }
          .header.light {
            background-color: white;
            color: black;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
          background-color: ${isHeaderDarkMode ? "black" : "white"};
          color: ${isHeaderDarkMode ? "#FFFFFF" : "#000"};
        }
      `}</style>
    </nav>
  );
};

export default Header;
