import {LibraryIcon,HomeIcon,PlusCircleIcon, RssIcon, SearchIcon, HeartIcon} from '@heroicons/react/outline'
import {signOut,useSession} from 'next-auth/react'
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import Image from 'next/image';
import spotifyLogo from '../components/Video/spotifyLogo.png'
import { useRecoilState } from 'recoil';
import {playlistIdState} from '../atoms/playlistAtom'


function Sidebar() {


  const spotifyApi=useSpotify();
  const{data:session,status}=useSession();
  const [playlists,setPlaylists]=useState([]);
  const [playlistId,setPlaylistId]=useRecoilState(playlistIdState);

  //whenever you click on the playlist, it will be stored in the state

   useEffect(()=>{

    if(spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then((data)=>{
        setPlaylists(data.body.items);
      });
    }

   },[session,spotifyApi]);



  console.log(playlists);
  return (
    <>
    <div className='text-gray-500 p-5 text-sm scrollbar-hide border-r border-gray-900 overflow-y-scroll h-screen font-sans ' style={{minWidth:`280px`,maxWidth:`290px`,borderRight:`0.5px solid gray`}}>
    {/*<img className="sidebar_logo" src="" alt="" style={{height:`80px`,padding:`10px`,marginRight:`auto`,objectFit:`contain`}}/>*/}
    <Image src={spotifyLogo} style={{height:`60px`,padding:`10px`,marginRight:`auto`,objectFit:`contain`,transform:`scale(0.8)`,marginTop:`0em`}}/>

    <div className='space-y-8 ' style={{position:`relative`,marginTop:`3em`}} >

    

        <button className="flex items-center space-x-6 hover:text-white">
        <HomeIcon className="h-7 w-7"  />
        <p style={{fontSize:`1.3em`,fontWeight:`700`}}>Home</p>
        </button>

       

        <button className="flex items-center space-x-6 hover:text-white">
        <HeartIcon className="h-7 w-7"/>
        <p style={{fontSize:`1.3em`,fontWeight:`700`}}>Liked Songs</p>
        </button>

        <button className="flex items-center space-x-6 hover:text-white">
        <PlusCircleIcon className="h-7 w-7" />
        <p style={{fontSize:`1.3em`,fontWeight:`700`}}>Create Playlist</p>
        </button>

        <hr className='border-t-[0.1px]; border-gray-400 '/>

        <button className="flex items-center space-x-6 hover:text-white">
        <LibraryIcon className="h-7 w-7" />
        <p style={{fontSize:`1.3em`,fontWeight:`700`}}>Library</p>
        </button>

        <button className="flex items-center space-x-6 hover:text-white">
        <RssIcon className="h-7 w-7" />
        <p style={{fontSize:`1.3em`,fontWeight:`700`}}>Your Episodes</p>
        </button>

        <button className="flex items-center space-x-6 hover:text-white">
        <SearchIcon className="h-7 w-7" />
        <p style={{fontSize:`1.3em`,fontWeight:`700`}}>Search</p>
        </button>

        
        <hr className='border-t-[0.1px]; border-gray-400 '/>

        {/*----------PLAYLISTS---------- */}

        {playlists.map((playlist)=>(
                  <p key={playlist.id} onClick={()=>setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white' style={{fontSize:`1.3em`,fontWeight:`700`}}>{playlist.name}</p>

        ))}
        
    </div>
    </div>
    </>
  )
}

export default Sidebar