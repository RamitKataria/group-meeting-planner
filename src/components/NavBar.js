import "../css/navBar.css";
import Home from "./Home.js";
import NewMeeting from "./NewMeeting.js";
import Account from "./Account.js";


export default function NavBar() {
	return (
		<div className="navMenu">
			<Header />
			<Route path="/">
				<Home />
			</Route>
			<Route path="/newMeeting">
				<NewMeeting />
			</Route>
			<Route path="/account">
				<Account />
			</Route>
			<Footer />
		</div>
	);
}