import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { FiSun, FiMoon } from "react-icons/fi";
import { useState } from "react";
import { lightContext } from "./lightContext";

const App = ({ Component, pageProps }: AppProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleLightClick = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <lightContext.Provider value={isDarkMode}> 
      <div className={`layout toggle-button ${isDarkMode ? "dark" : "light"}`}  onClick={handleLightClick}> 
          <div className={`icon-container ${isDarkMode ? "dark" : ""}`}>  
            {isDarkMode ? <FiSun /> : <FiMoon />} 
          </div>
      </div>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
        <style jsx>{`
        .toggle-button {
          background-color: white;
          color: black;
          padding: 0.5rem 1rem;
          cursor: pointer;
        } 
        .toggle-button.dark {
          background-color: black;
          color: white;
        }
        .real-toggle-button {
          display: inline-block;
          border: 1px solid ${isDarkMode ? "white" : "black"};
        }
        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border: 1px solid black;
          border-radius: 3px;
        }
      
        .icon-container.dark {
          border-color: white;
        }
      `}</style> 
    </lightContext.Provider>
  );
};

export default App;
