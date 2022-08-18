import Center from '../components/Center'
import Sidebar from '../components/Sidebar'
import { getSession } from 'next-auth/react'
import Player from '../components/Player'

const Home = () => {
  return (
  <>
 
  <div className='bg-[#141414] h-screen overflow-hidden'>
    
  <main className='flex'>
  <Sidebar/>
  <Center/>
  
  </main>

  <div className="sticky bottom-0">
    <Player />
  </div>
  
  </div>
  
  
  </>
  )
}


export async function getServerSideProps(context){
  const session=await getSession(context);

  return{
    props:{
      session,
    },
  };
}

export default Home
