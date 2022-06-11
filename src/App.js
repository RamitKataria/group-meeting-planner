// import NavBar from "./components/NavBar"
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <NavBar/>
//     </div>
//   );
// }
//
// export default App;
// import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/pages/Home';
import NewMeeting from './components/pages/NewMeeting';
import Account from './components/pages/Account';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/newMeeting' element={<NewMeeting />} />
                    <Route path='/account' element={<Account />} />
                    {/*<Route path='/order' element={<Blank />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;