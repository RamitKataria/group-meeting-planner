// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './components/pages/Home';
// import NewMeeting from './components/pages/NewMeeting';
// import Account from './components/pages/Account';
import NavBar from './components/NavBar.js';
// import AllMeetings from "./components/pages/AllMeetings.js";

function App() {
    return (
        <NavBar/>
        // <BrowserRouter>
        //     <Routes>
        //         <Route path='/' element={<NavBar />}>
        //             <Route index element={<Home />} />
        //             <Route path='/home' element={<Home />} />
        //             <Route path='/newMeeting' element={<NewMeeting />} />
        //             <Route path='/allMeetings' element={<AllMeetings />} />
        //             <Route path='/account' element={<Account />} />
        //         </Route>
        //     </Routes>
        // </BrowserRouter>
    );
}

export default App;