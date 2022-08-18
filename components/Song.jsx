import useSpotify from "../hooks/useSpotify"
import milliToMinAndSec from '../lib/SongTime'
import { currentTrackIdState,isPlayingState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";

function Song({order,track}) {

    const spotifyApi=useSpotify();
    const [currentTrackId,setCurrentTrackId]=useRecoilState(currentTrackIdState);
    const [isPlaying,setIsPlaying]=useRecoilState(isPlayingState);

  const playSong=()=>{

    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris:[track.track.uri],
    })

  }



  return (
    <>
    
    
    
    <div className="grid grid-cols-2 hover:bg-gray-700 py-4 px-5 text-gray-500 rounded-lg" onClick={playSong} style={{cursor:`pointer`}}>
    
    <div className="flex items-center space-x-5">
      
        <p style={{fontSize:`17px`,fontWeight:`600`}}>{order + 1 }</p>
        <img src={track.track.album.images[0]?.url} alt="image" className="song-image" style={{height:`65px`,width:`65px`}} />
    
    <div>
        <p className="w-35 lg:w-65 text-white truncate" style={{fontSize:`18px`,fontWeight:`550`}}>{track.track.name}</p>
        <p className="w-40" style={{fontSize:`15px`,fontWeight:`550`}}>{track.track.artists[0].name}</p>
    </div>
    </div>

    <div className="flex items-center justify-between ml-auto md:ml-0">
    <p className="hidden md:inline" style={{fontSize:`18px`,fontWeight:`550`}}>{track.track.album.name}</p>
        <p style={{fontSize:`18px`,fontWeight:`550`}}>{milliToMinAndSec(track.track.duration_ms)}</p>
    </div>
    </div>
    </>
  )
}

export default Song