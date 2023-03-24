import './App.css';
import React, {useEffect, useState} from 'react';
import { accessToken, logout, getUserProf } from './spotify';
import Login from './components/layouts/Login.js';
import Results from './components/layouts/Results.js';


function App() {

  const [ token, setToken ] = useState(null);
  const [ name, setName ] = useState(null);
  const [userUrl, setUserUrl] =useState(null)

  useEffect(() => {
    //set token state to match accessToken sent from spotify.js
    setToken(accessToken)
    
    const fetchData = async () => {
      try {
        //create variable data to fill with user profile data via the getUserProf function from spotify.js
        const {data} = await getUserProf();
        //set name state to user's display name
        setName(data.display_name)
        //set userUrl state to user's spotify url
        setUserUrl(data.external_urls.spotify)
      }
      catch(e) {
        console.error(e)
      }
    }
    //invoke the fetchData function above
    fetchData();
  }, []);

  return (
    <div className="App">
      {!token ? (
        //if there is no access token stored in the token state, display the login layout connected to :8888/login
        <>
          <Login
            href="http://localhost:8888/login"
          />
        </>
      ) :  ( //otherwise display the results layout and pass it the token, name, and userUrl state values and logout function
        <>
        <Results
          accessToken={token}
          name={name}
          logout={logout}
          userUrl={userUrl}
        />
        </>
      )}
    </div>
  );
}

export default App;
