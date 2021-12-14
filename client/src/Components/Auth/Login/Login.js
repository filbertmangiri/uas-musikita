

export default function Login() {
	const client_id = 'be8b5e8c1ffa4fde85eb9526330dfb09'
	const redirect_uri = 'https://musikita.netlify.app'
	
	const scopes = [
		'streaming',
		'user-read-email',
		'user-read-private',
		'user-library-read',
		'user-library-modify',
		'user-read-playback-state',
		'user-modify-playback-state'
	]

	let AUTH_URL = 'https://accounts.spotify.com/authorize?' +
		'client_id=' + client_id +
		'&response_type=code' +
		'&redirect_uri=' + redirect_uri +
		'&scope='
	
	scopes.forEach(value => {
		AUTH_URL += (value ? '%20' : '') + value
	})
	
	return (
		<a className="btn btn-dark btn-lg" role="button" href={AUTH_URL}>Login with Spotify</a>
	)
}