// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './components/pages/Home';
// import NewMeeting from './components/pages/NewMeeting';
// import Account from './components/pages/Account';
import NavBar from './components/NavBar.js';
import NavBar2 from './components/Navbar2.js';
// import AllMeetings from "./components/pages/AllMeetings.js";
import AOS from 'aos';
import Footer from "./components/Footer";

function App() {
    AOS.init();
    return (
            // <NavBar/>
            <NavBar2/>
    );
}

export default App;