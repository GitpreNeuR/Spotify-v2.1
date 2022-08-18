import { signIn,useSession } from "next-auth/react"
import { useEffect } from "react";
import spotifyApi from '../lib/Spotify'


function useSpotify() {
    const {data:session,status}=useSession();

    useEffect(()=>{
        if(session){

            //if refresh access token fails,redirect te user to the login page
            if(session.error === 'RefreshAccessTokenError'){
                signIn();
            }
            spotifyApi.setAccessToken(session.user.accessToken);

        }
    },[session])


  return spotifyApi;
}

export default useSpotify