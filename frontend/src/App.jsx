import { AuthProvider } from "./contexts/AuthContext";
import Authentication from "./pages/Authentication";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideMeet from "./pages/VideMeet";   // <- default import

function App() {
  
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/auth' element={<Authentication/>} />
            <Route path='/:url' element={<VideMeet/>} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
