import './App.css';
import React, {useEffect, useState} from 'react';
import { accessToken, logout, getUserProf } from './spotify';
import Login from './components/layouts/Login.js';
import Results from './components/layouts/Results.js';
import Bg from './components/images/spotifyJazzedBg.png';


function App() {

  const [ token, setToken ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ name, setName ] = useState(null);

  useEffect(() => {
    setToken(accessToken)
    
    const fetchData = async () => {
      try {
        const {data} = await getUserProf();
        setUser(data);
        setName(data.display_name)
        console.log(data);
      }
      catch(e) {
        console.error(e)
      }

    }
    
    fetchData();
  }, []);

  return (
    <div className="App" style={styles.bg}>
      {!token ? (
        <>
          <Login
            href="http://localhost:8888/login"
          />
        </>
      ) : (
        <>
        <Results
          accessToken={token}
          name={name}
          logout={logout}
        />
        </>
      )}
    </div>
  );
}

export default App;

const styles = {
  bg: {
    backgroundImage: `url(${Bg})`,
    alignItems:'center',
    height: '100vh',
    width:'100vw',
    position:'absolute'
  },
}
