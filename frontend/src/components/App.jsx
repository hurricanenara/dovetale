import { useContext } from 'react';
import Auth from './auth/Auth'
import Navbar from './Navbar'
import { AuthContext } from '../context/AuthContext';
import Gifs from './Gifs/Gifs';

function App() {
  const auth = useContext(AuthContext);

  if (!auth.token) {
    return <Auth />
  }

  return (
    <>
      <Navbar />
      <Gifs />
    </>
  )
}

export default App;
