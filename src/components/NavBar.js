import "../css/navBar.css";
import Home from "./pages/Home.js";
import NewMeeting from "./pages/NewMeeting.js";
import Account from "./pages/Account.js";
import Route from "./Route.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faUser} from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
	return (
		<div >
			<div className="sidebar">
				<a href="/" className="item-top"><FontAwesomeIcon icon={faHouse}/>

				</a>
				<a href="./newMeeting" className="item-top"><FontAwesomeIcon icon={faPlus}/>

				</a>
				<a href="./account" className="item-bottom"><FontAwesomeIcon icon={faUser}/>
				</a>
			</div>

			<Route path="/">
				<Home />
			</Route>
			<Route path="/newMeeting">
				<NewMeeting />
			</Route>
			<Route path="/account">
				<Account />
			</Route>
			{/*<Footer />*/}
		</div>
	);
}