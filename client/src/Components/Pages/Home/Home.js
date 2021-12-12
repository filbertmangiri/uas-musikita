import { useEffect } from "react";
import $ from "jquery";

import styles from './Home.module.css'
import Login from "../../Auth/Login/Login";
import Dashboard from "../Dashboard/Dashboard";

const code = new URLSearchParams(window.location.search).get('code')

export default function Home() {
	useEffect(() => {
		$('body').removeClass().addClass(styles.background)
	})

	return code ? (
		<Dashboard code={code} />
	) :
	(
		<div className="text-center text-white">
			<h1 className="display-1 fw-bold">Musikita</h1>
			<p className="pt-4">Mulai petualangan kamu dengan mendengarkan alunan melodi</p>
			<Login />
		</div>
	)
}