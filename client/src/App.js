// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './components/pages/Home';
// import NewMeeting from './components/pages/NewMeeting';
// import Account from './components/pages/Account';
import NavBar from './components/NavBar.js';
// import AllMeetings from "./components/pages/AllMeetings.js";
import AOS from 'aos';

function App() {
    AOS.init();
    return (
        <NavBar/>
    );
}

export default App;