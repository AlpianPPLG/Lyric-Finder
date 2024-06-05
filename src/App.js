import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) => "Lyrics Finder".slice(0, index + 1));
      setIndex((prevIndex) => (prevIndex + 1) % ("Lyrics Finder".length + 1));
    }, 200);

    return () => clearInterval(interval);
  }, [index]);

  function searchLyrics() {
    if (artist === "" || song === "") {
      alert("Artist dan Song tidak boleh kosong!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    Axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      .then((res) => {
        setIsLoading(false);
        if (
          res.data.lyrics === null ||
          res.data.lyrics === undefined ||
          res.data.lyrics === ""
        ) {
          alert(
            "Lagu tidak ditemukan! Mungkin ada typo atau judul lagu yang salah"
          );
        } else {
          setLyrics(res.data.lyrics);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response?.status === 404) {
          alert("Lagu Dan Penyanyi Tidak Ditemukan!");
        } else {
          console.error(err);
        }
      });
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchLyrics();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <h1 onClick={() => window.location.reload()}>{text}</h1>

      <input
        className="inp"
        type="text"
        placeholder="Artist name"
        onChange={(e) => {
          setArtist(e.target.value.replace(/(.{30})/g, "$1\n"));
        }}
        onKeyPress={handleKeyPress}
      />
      <input
        className="inp"
        type="text"
        placeholder="Song name"
        onChange={(e) => {
          setSong(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <button
        className="btn"
        onClick={() => searchLyrics()}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Search"}
      </button>
      <br />
      <button className="button" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <hr />
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {lyrics}
      </pre>
      <br />
      <div className="footer">
        © 2024 Copyright:
        <a
          style={{
            color: darkMode ? "white" : "black",
            fontSize: "17px",
            textDecoration: "none",
          }}
          href="https://github.com/AlpianPPLG"
        >
          {" "}
          Alpian
        </a>
      </div>
    </div>
  );
}

export default App;
