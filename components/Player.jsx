import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify"
import { currentTrackIdState,isPlayingState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";
import { useCallback, useEffect, useState } from "react";
import useSongInfo from "../hooks/useSongInfo";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import {Slider} from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import {debounce} from 'lodash'






function Player() {

    const spotifyApi=useSpotify();
    const{data:session,status}=useSession();
    const [currentTrackId,setCurrentTrackId]=useRecoilState(currentTrackIdState);
    const [isPlaying,setIsPlaying]=useRecoilState(isPlayingState);
    const [volume,setVolume]=useState(30);
    const songInfo=useSongInfo();

    const fetchCurrentSong=()=>{
      if(!songInfo){
        spotifyApi.getMyCurrentPlayingTrack().then(data=>
          {
            console.log("Now playing: ", data.body?.item);
            setCurrentTrackId(data.body?.item?.id);


            spotifyApi.getMyCurrentPlaybackState().then((data)=>{

              setIsPlaying(data.body?.item?.id);
            });

          });
      }
    };

    /* useCallback() Returns a memoized callback.

Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).

useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). */

    

    useEffect(()=>{
      if(spotifyApi.getAccessToken() && !currentTrackId){
        //fetch te song info

        fetchCurrentSong();
          setVolume(30);

        
      }
    },[currentTrackIdState,spotifyApi,session]);


    const debouncedAdjustVolume=useCallback(
      /*The debounce() method of Function in lodash is used to create a debounced function which delays the given func until after the stated wait time in milliseconds have passed since the last time this debounced function was called.
       The debounced function has a cancel method that can be used to cancel the func calls that are delayed and a flush method which is used to immediately call the delayed func.  */
      

       /*WHAT IS A DEBOUNCE FUNCTION */

       /*The debounce() function forces a function to wait a certain amount of time before running again.
       The function is built to limit the number of times a function is called. The Send Request() function is debounced.
       Requests are sent only after fixed time intervals regardless of how many times the user presses the button. */


       debounce((volume)=>{


         spotifyApi.setVolume(volume);
       },500),[]

    );

    


    useEffect(()=>{

      if(volume > 0 && volume < 100){
        debouncedAdjustVolume(volume);
      }
    },[volume])


    const handlePlayPause=()=>{
      spotifyApi.getMyCurrentPlaybackState().then(()=>{
        if(data.body.is_playing){
          spotifyApi.pause();
          setIsPlaying(false);
        }

        else{
          spotifyApi.play();
          setIsPlaying(true);
        }
      });
    };

  return (
    <>
    <div className="grid grid-cols-3 px-8 bg-gradient-to-b from-[#0e0d0d] to-gray-900 text-white" style={{height:`100px`,borderTop:`1px solid gray`}}>
    <div className="flex items-center space-x-5">
        <img className="hidden md:inline" style={{height:`60px`,width:`60px`,backgroundColor:`red`}} src={songInfo?.album.images?.[0]?.url} alt=""/>
      <div>
        {/*<h3>{songInfo?.name}</h3>
        <p>{songInfo?.artists?.[0]?.name}</p>*/}
        <h3>Cidegirl</h3>
        <p>Komi cant Communicate</p>
      </div>
    
    </div>
    <div className='flex items-center justify-evenly'>
      
      
      
    <ShuffleIcon className="button-icon" style={{cursor:`pointer`,fontSize:`1.5em`,transition:`0.3s`}}/>
      <SkipPreviousIcon className="button-icon" style={{cursor:`pointer`,fontSize:`1.7em`,transition:`0.3s`}}/>
      {
        isPlaying ? (
          <PauseCircleFilledRoundedIcon  className="button-icon" onClick={handlePlayPause} style={{cursor:`pointer`,fontSize:`3em`,transition:`0.3s`}}/>
        ):(
        <PlayCircleFilledWhiteRoundedIcon className="button-icon" onClick={handlePlayPause} style={{cursor:`pointer`,fontSize:`3em`,transition:`0.3s`}}/>
        )
      }
      <SkipNextIcon className="button-icon" style={{cursor:`pointer`,fontSize:`1.7em`,transition:`0.3s`}}/>
      
      <RepeatIcon className="button-icon" style={{cursor:`pointer`,fontSize:`1.5em`,transition:`0.3s`}}/>
      
      
      
    </div>

    <div className="flex items-center space-x-4 justify-end pr-5">
      
      <VolumeUpRoundedIcon className="button-icon" onClick={()=> volume > 0 && setVolume(volume-10)} style={{cursor:`pointer`,fontSize:`1.7em`,transition:`0.3s`}}/>
      <Slider style={{width:`300px`,color:`green`}} value={volume} onChange={(e)=>setVolume(Number(e.target.value))} min={0} max={100} />
      <VolumeDownRoundedIcon className="button-icon" onClick={()=> volume < 100 && setVolume(volume+10)} style={{cursor:`pointer`,fontSize:`1.7em`,transition:`0.3s`}}/>

    </div>

    </div>

    {/*--------CENTER SECTION----- */}
    

    </>
  )
}

export default Player