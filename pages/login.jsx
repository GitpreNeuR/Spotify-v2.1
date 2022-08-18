import {getProviders,signIn} from "next-auth/react"


function Login({providers}){
  return (
    <>
 <div className="login">
 <img src= "https://1000logos.net/wp-content/uploads/2017/08/Spotify-symbol.jpg" alt=" "/>

     {Object.values(providers).map((provider)=>(
         <div className="a-container" key={provider.name}>
      <button onClick={signIn(provider.id,
        {callbackUrl:"/"})}>LOGIN TO SPOTIFY</button>
      </div>

       ))}
</div>

    </>
  )
}

export default Login;

//server side rendering to get all the providers
/*
this point this will run on the server before the page gets delivered every time this is called a server side render anytime someone comes to the
login page i want to make sure i get the latest providers right so it's going to render out the page on the server and then go ahead and deliver it to the
client 
*/
export async function getServerSideProps(){

  const providers=await getProviders();

  return{
    props:{
      providers,
    }
  }

}