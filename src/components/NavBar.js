import "../css/navBar.css";

export default function NavBar() {
	return (
		<div className="navMenu">
			<Header />
			<Route path="/">
				<Home />
			</Route>
			<Route path="/recipe">
				<RecipePage />
			</Route>
			<Route path="/about">
				<About />
			</Route>
			<Footer />
		</div>
	);
}