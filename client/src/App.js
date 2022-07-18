
import NavBar from './components/NavBar.js';
import NavBar2 from './components/Navbar2.js';
import {BrowserRouter, Router} from "react-router-dom";

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBar2/>
            </BrowserRouter>
        </div>
            // <NavBar/>

    );
}

export default App;