import { useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { PlayerContext } from "./context/PlayerContext";
import { useContext } from "react";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const { audioRef, songData } = useContext(PlayerContext);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <AuthProvider>
      <div className="h-screen bg-black">
        {isLoginPage || isRegisterPage ? (
          <div className="flex h-full items-center justify-center">
            <Layout />
          </div>
        ) : (
          <>
            <div className="h-[90%] flex">
              <Sidebar />
              <Layout />
            </div>
            <Player />
              {songData && <audio ref={audioRef} src={songData.url} preload="auto">
                <track />
              </audio>}
          </>
        )}
      </div>
    </AuthProvider>
  );
};

export default App;
