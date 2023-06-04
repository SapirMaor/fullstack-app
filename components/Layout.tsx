import React, { ReactNode } from "react";
import Header from "./Header";
import { useState, useContext , useEffect } from "react";
import { FiSun, FiMoon } from 'react-icons/fi';
import { lightContext } from "../pages/lightContext";


type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const isDarkMode = useContext(lightContext);
  const [isLayoutDarkMode, setisLayoutDarkMode] = useState(isDarkMode);
 
  useEffect(() => {
    setisLayoutDarkMode(isDarkMode);
  });

  return(
    <div className={`layout ${isDarkMode ? "dark" : "light"}`}>
      <Header />
      {props.children}
      <style jsx global>{`
        html {
          box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        body {
          margin: 0;
          padding: 0;
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
          background: rgba(0, 0, 0, 0.05);
        }

        input,
        textarea {
          font-size: 16px;
        }

        .layout.dark {
          background-color: black;
          color: white;
        }
        .layout.light {
          background-color: white;
          color: black;
        }
      `}</style>
      <style jsx>{`
        .layout {
          padding: 0 2rem;
        }
      `}</style>
    </div>
  );
};

export default Layout;

