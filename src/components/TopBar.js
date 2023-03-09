import { useState } from "react";
import song from "../audio/yugioh-anime-outro.mp3"

function TopBar () {

    const [audio, setAudio] = useState({file: new Audio(song), isPlaying: false})

    let toggleAudio = () => {

        console.log("This function has been accessed")
    
        if (audio.isPlaying) {
          // Pause the song if it is playing
          audio.file.pause();
        } else {
    
          // Play the song if it is paused
          audio.file.play();
        }

        setAudio({ ...audio, isPlaying: !audio.isPlaying });
    }

    return (
    <div className='top-bar'>
        
        <header className='header-section'>
          <h1 className='header-title'>Yugioh State Simulator</h1>
        </header>

        <button className='audio-button' onClick={toggleAudio}>
            <img className='audio-icon' src={require(`../images/audio-icon-white.png`)} alt="An audio icon" />
        </button>

        <audio src={require(`../audio/yugioh-anime-outro.mp3`)} type="audio/ogg" autoPlay loop />
    </div>
    )
}

export default TopBar;