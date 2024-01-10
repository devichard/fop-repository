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

function App() {
  const { user, authIsReady } = useAuthContext();

  if(!authIsReady) return <Loading />;

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="App flex">
        <BrowserRouter>
          {user ? (
            <>
              <Sidebar />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </div>
              <MembersBar />
            </>
            ) : (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Signup />} />
              </Routes>
            )
          }
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
