import { Link } from "react-router-dom";

export default function Home() {
	return (
		<main className="home-page">
			<h1>Personal Feed</h1>
			<p>A little space to share moments and catch up with your latest posts.</p>
			<nav className="home-nav" aria-label="Main navigation">
				<Link to="/create-post">Create a post</Link>
				<Link to="/feed">View feed</Link>
			</nav>
		</main>
	);
}
