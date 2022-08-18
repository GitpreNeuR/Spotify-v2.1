import { ChevronDownIcon } from '@heroicons/react/outline';
import {signOut,useSession} from 'next-auth/react'
import { useEffect, useState } from 'react';
import {shuffle} from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil';
import {playlistIdState,playlistState} from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify';
import SearchBar from './SearchBar';
import Songs from './Songs';

    
    const colors=[

        "from-indigo-500",
        "from-blue-500",
        "from-green-500",
        "from-red-500",
        "from-yellow-500",
        "from-pink-500",
        "from-purple-500",


    ];

    function Center(){

    const spotifyApi=useSpotify();
    const {data:session}=useSession();
    const [color,setColor]=useState(null);
    const playlistId=useRecoilValue(playlistIdState);
    const[playlist,setPlaylist]=useRecoilState(playlistState);



    useEffect(()=>{
        setColor(shuffle(colors).pop());
    },[playlistId]);


    useEffect(()=>{
        spotifyApi.getPlaylist(playlistId).then((data)=>{
            setPlaylist(data.body);
        }).catch((error) => console.log('Someting went wrong!!!!', error))
    },[spotifyApi,playlistId]);
    console.log(playlist);

  return (
    <>
    <div className=' flex-grow h-screen overflow-y-scroll scrollbar-hide'>
    
        <header className="fixed top-8 right-5" style={{display:`flex`,gap:`10em`}}>
        <SearchBar/>

            <div onClick={signOut()} className='flex items-center bg-red-300 space-x-3 opacity-100 hover:opacity-95 cursor-pointer rounded-full p-1 pr-2 ' style={{border:`1px solid red`,position:`relative`,left:`8em`,marginRight:`7em`,margin:`auto`}}>
                <img src={session?.user?.image} className="rounded-full w-10 h-10" alt=""/>

                <h2 className='text-black'>{session?.user.name}</h2>
            <ChevronDownIcon className="hh-5 w-5"/>
            </div>

           
        </header>

        <section className={`flex items-end space-x-7 bg-gradient-to-b to to-[#141414] ${color} h-80 text-white`} >
            <div className='body-image-container' style={{height:`300px`,width:`320px`,borderRadius:`10px`,boxShadow:`0 4px 60px rgba(0, 0, 0, 0.5)`,margin:`0 40px`}}>
            <img src={playlist?.images?.[0]?.url} className="body-image" style={{height:`100%`,width:`100%`,borderRadius:`10px`,boxShadow:`0 4px 60px rgba(0, 0, 0, 0.5)`}}/>
            </div>
            <div className="body-info" style={{padding:`10px`}}>
                <p style={{fontSize:`2em`}}>PLAYLIST</p>
            <h1 style={{fontSize:`5em`,fontWeight:`550`,marginBottom:`10px`
}}>{playlist?.name}</h1>
            <p style={{color:'white',fontSize:`15px`,fontWeight:`400`}}>{playlist?.description}</p>
            </div>
            
        </section>
<br/>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

<Songs/>

        <div>
        </div>

        
    </div>
    </>
  )
}

export default Center