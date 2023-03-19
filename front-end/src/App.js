import './App.css';
import React, {useEffect, useState} from 'react';
import { accessToken, logout, getUserProf } from './spotify';

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
    <div className="App">
      <header className="App-header">
      {!token ? (
      <a 
      className="App-Link" 
      href="http://localhost:8888/login"
      >
        Login to Spotify
      </a>
      ) : (
        <>
        <h1>Welcome, {name}</h1>
        <h5>You're Currently Logged In</h5>
        <button onClick={logout}>Log Out</button>
        </>
      )}
        
        
      </header>
    </div>
  );
}

export default App;
