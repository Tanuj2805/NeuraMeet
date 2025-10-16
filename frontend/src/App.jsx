import Authentication from "./pages/Authentication"
import LandingPage from "./pages/LandingPage"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
function App() {
  

  return (
    <>
    <Router>
        <Routes>

            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/auth' element={<Authentication/>}></Route>
        </Routes>

        
      </Router>
      
    </>
  )
}

export default App
