import "./App.css";
import MembersBar from "./components/shared/MembersBar";
import Sidebar from "./components/shared/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { ThemeProvider } from "./Providers/ThemeProvider";
import { useAuthContext } from "./hooks/useAuthContext";
import Loading from "./components/shared/Loading";
import Profile from "./pages/Profile/Profile";
import Chat from "./components/shared/Chat";
import ChatButton from "./components/shared/ChatButton";
import { useState } from "react";
import { useCollection } from "./hooks/useCollection";

function App() {
  const { user, authIsReady } = useAuthContext();
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [rerender, setRerender] = useState(false);

  const { documents: users } = useCollection("users");
  const { documents: chats } = useCollection("chats");

  if (!chats) return <Loading />;

  if (!authIsReady) return <Loading />;

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="App flex">
        <BrowserRouter>
          {user ? (
            <>
              <Sidebar rerender={rerender} setRerender={setRerender} />
              <div className="flex-grow">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route
                    path="/profile"
                    element={
                      <Profile rerender={rerender} setRerender={setRerender} />
                    }
                  />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </div>
              <MembersBar
                users={users}
                chats={chats}
                setSelectedChat={setSelectedChat}
                setChatIsOpen={setChatIsOpen}
              />
              {chatIsOpen && (
                <Chat
                  users={users}
                  setSelectedChat={setSelectedChat}
                  setChatIsOpen={setChatIsOpen}
                  chats={chats}
                  selectedChat={selectedChat}
                />
              )}
              <ChatButton
                setChatIsOpen={setChatIsOpen}
                setSelectedChat={setSelectedChat}
              />
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Signup />} />
            </Routes>
          )}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
