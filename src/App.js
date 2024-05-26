import './App.css'; 
import Axios from 'axios'; 
import { useState } from 'react'; 

function App() { 
	const [artist, setArtist] = useState(""); 
	const [song, setSong] = useState(""); 
	const [lyrics, setLyrics] = useState(""); 

	function searchLyrics() { 
		if (artist === "" || song === "") { 
			alert("Artist dan Song tidak boleh kosong!"); 
			return; 
		} 
		Axios.get( 
	`https://api.lyrics.ovh/v1/${artist}/${song}`).then(res => { 
		if (res.data.lyrics === null || res.data.lyrics === undefined || res.data.lyrics === "") { 
			alert("Lagu tidak ditemukan! Mungkin ada typo atau judul lagu yang salah"); 
		} else { 
			setLyrics(res.data.lyrics); 
		}	 
	})
	.catch(err => {
		if (err.response?.status === 404) {
			alert("Lagu Dan Penyanyi Tidak Ditemukan!"); 
		} else {
			console.error(err);
		}
	}) 
} 

	return ( 
		<div className="App"> 
			<h1 onClick={() => {window.location.reload();}}>Lyrics Finder</h1> 

			<input className="inp" type="text"
				placeholder='Artist name'
				onChange={(e) => { setArtist(e.target.value) }} /> 
			<input className="inp" type="text"
				placeholder='Song name'
				onChange={(e) => { setSong(e.target.value) }} /> 
			<button className="btn"
				onClick={() => searchLyrics()}> 
					Search</button> 
			<hr /> 
			<pre>{lyrics}</pre> 
		</div> 
	); 
} 

export default App;