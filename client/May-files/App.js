import CreatePopBox from "./popbox";
import CreateGuestPage from "./guestPage";
import {BrowserRouter ,Routes, Route} from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./login"



function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path ='/' element={<SignUp/>}/>
                  <Route path='/login' element={<Login />} />
                  <Route path='/guestPage' element={<CreateGuestPage />} />
              </Routes>

          </BrowserRouter>


      </>
  )
}

export default App;
