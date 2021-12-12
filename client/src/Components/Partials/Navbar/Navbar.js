import { useEffect } from "react";
import { Link } from 'react-router-dom';
import $ from "jquery";

export default function Navbar() {
	useEffect(() => {
		$(window).on('click', function(event) {
			let $clickOver = $(event.target)
		
			if ($('.navbar .navbar-toggler').attr('aria-expanded') == 'true' && $clickOver.closest('.navbar').length === 0) {
				$('button[aria-expanded="true"]').click();
			}
		})
	})

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
			<div className="container">
				<Link className="navbar-brand" to="/">Musikita</Link>
				
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarText">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link active" aria-current="page" to="/home">Home</Link>
						</li>

						<li className="nav-item">
							<Link className="nav-link" to="/about">About</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}