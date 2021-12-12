import axios from 'axios'
import { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

import UseAuth from "../../Auth/UseAuth/UseAuth"
import MusicPlayer from './MusicPlayer'
import TrackSearchResults from './TrackSearchResults'

const spotifyApi = new SpotifyWebApi({
	clientId: '3a3cb05494594984800ca14d25ebe2a2'
})

export default function Dashboard({ code }) {
	const accessToken = UseAuth(code)
	const [search, setSearch] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [playingTrack, setPlayingTrack] = useState()
	const [lyrics, setLyrics] = useState('')

	function chooseTrack(track) {
		setPlayingTrack(track)
		setSearch('')
		setLyrics('')
	}

	useEffect(() => {
		if(!playingTrack) return

		axios
		.get('http://localhost:3001/lyrics', {
			params: {
				track: playingTrack.title,
				artist: playingTrack.artist
			}
		})
		.then(res => {
			setLyrics(res.data.lyrics)
		})
	}, [playingTrack])

	useEffect(() => {
		if(!accessToken) return
		spotifyApi.setAccessToken(accessToken)
	}, [accessToken])

	useEffect(() => {
		if(!search) return setSearchResults([])
		if(!accessToken) return

		let cancel = false

		spotifyApi.searchTracks(search).then(res => {
			if(cancel) return

			setSearchResults(res.body.tracks.items.map(track => {
				const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
					if(image.height < smallest.height) return image

					return smallest
				}, track.album.images[0])

				return {
					artist: track.artists[0].name,
					title: track.name,
					uri: track.uri,
					albumUrl: smallestAlbumImage.url
				}
			}))
		})

		return () => cancel = true
	}, [search, accessToken])

	return (
		<div className="d-flex flex-column" style={{ height: '100vh' }}>
			<div className="form-floating">
				<input
					type="search"
					className="form-control text-light"
					placeholder=" "
					value={search}
					onChange={e => setSearch(e.target.value)}

					style={{ backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none'}}
				/>
				<label className='text-light'>Cari Lagu/Penyanyi</label>
			</div>

			<div className="flex-grow-1 mt-4 text-light" style={{ overflowY: 'auto' }}>
				{searchResults.map(track => (
					<TrackSearchResults
						track={track}
						key={track.uri}
						chooseTrack={chooseTrack}
					/>
				))}
				{searchResults.length === 0 && (
					<div className='text-center text-light' style={{ whiteSpace: 'pre' }}>
						{lyrics}
					</div>
				)}
			</div>

			<div>
				<MusicPlayer
					accessToken={accessToken}
					trackUri={playingTrack?.uri}
				/>
			</div>
		</div>
	)
}