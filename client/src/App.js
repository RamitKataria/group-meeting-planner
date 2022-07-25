import NavBar from './components/NavBar.js';
import {BrowserRouter, Router} from "react-router-dom";

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBar/>
            </BrowserRouter>
        </div>

    );
}

export default App;