import { useState } from 'react';
import axios from 'axios';
import Icon from '../images/spotifyAppLogo.png';
import Item from '../models/Item';

export default function Results(props){
    const [selected, setSelected] = useState("artist")
    const [input, setInput] = useState("")
    const [results, setResults] =useState([]);

    const getResults = async (res, req) =>{
        //custom search using user input, search type selection, and US market
        axios.get(`https://api.spotify.com/v1/search?q=${input}&type=${selected}&maret=US`, {
            headers: {
                //specifying expected content type to be returned
                "Accept": "application/json",
                "Content-Type": "application/json",
                //using the access token to get permission for API return
                "Authorization": "Bearer "+props.accessToken,
            },
        })
        .then(response => {
            //if there is any response, hide the 'no results to display' message
            if(response.data.length !== 0){
                    document.getElementById("nilRes").style.display = 'none';
            }
            //if the selected search type is 'artist' follow the deconstruction to the appropriate result items
            if(selected === 'artist'){
                const items = response.data.artists.items;
                const data = [];
                for(let i = 0; i <= 4; i++){
                    let item = items[i];
                    //if there is an image property, push to data from result array -- used to prevent no image crash bug
                    if(item.images[0].url.length !== 0){
                        data.push(item)
                    }
                }
                setResults(data)
            }
            //if the selected search type is 'album' follow the deconstruction to the appropriate result items
            if(selected === 'album'){
                const items = response.data.albums.items;
                const data = [];
                for(let i = 0; i <= 4; i++){
                    let item = items[i];
                    //if there is an image property, push to data from result array -- used to prevent no image crash bug
                    if(item.images[0].url.length !== 0){
                        data.push(item)
                    }
                }
                setResults(data)
            }
            //if the selected search type is 'album' follow the deconstruction to the appropriate result items
            if(selected === 'audiobook'){
                const items = response.data.audiobooks.items;
                const data = [];
                for(let i = 0; i <= 4; i++){
                    let item = items[i];
                    //if there is an image property, push to data from result array -- used to prevent no image crash bug
                    if(item.images[0].url.length !== 0){
                        data.push(item)
                    }
                }
                setResults(data)
            }
            
        })
        .catch(error => {
            console.error(error)
        })

    }

    const handleSelect = (event) => {
        //set selection state to value of option clicked on by the user
        const selection = event.target.value;
        setSelected(`${selection}`);
        if(event.target.value === 'artist'){
            //hide the irrelevant displays and show the relevant display
            document.getElementById('resultsTrack').style.display = 'none';
            document.getElementById('resultsAlbum').style.display = 'none';
            document.getElementById('resultsArtist').style.display = 'flex';
        }
        if(event.target.value === 'album'){
            //hide the irrelevant displays and show the relevant display
            document.getElementById('resultsTrack').style.display = 'none';
            document.getElementById('resultsAlbum').style.display = 'flex';
            document.getElementById('resultsArtist').style.display = 'none';
        }
        if(event.target.value === 'audiobook'){
            //hide the irrelevant displays and show the relevant display
            document.getElementById('resultsTrack').style.display = 'flex';
            document.getElementById('resultsAlbum').style.display = 'none';
            document.getElementById('resultsArtist').style.display = 'none';
        }
    }

    const handleInput = (input) => {
        //set the input state to match the user input
        setInput(input)
        //invoke the getResults function to initiate search
        getResults()
    }

    return(
        <div id='interface'>
            <div style={styles.logBut}>
                <p style={styles.greeting}>Welcome back, <br></br><a href={props.userUrl} id='userUrl'>{props.name}</a></p>
                <button id='logout' onClick={props.logout}>Log Out</button>
            </div>
            <div style={styles.imgContainer}>
                <a href='/'><img src={Icon} alt="Spotify Jazzed" id='icon'></img></a>
            </div>
            <div style={styles.searchBar}>
                <select id='select' onChange={handleSelect}>
                    <option defaultValue disabled>------</option>
                    <option value='artist'>Artist</option>
                    <option value='album'>Album</option>
                    <option value='audiobook'>Audiobook</option>
                </select>
                <input style={styles.input} onChange={e => handleInput(e.target.value)} value={input}></input>
            </div>
            <div style={styles.display}>
                <h2 style={styles.searchTypes}>{selected} - {input}</h2>
                <hr style={styles.hrs}></hr>
                <h1 id='nilRes' style={styles.nilRes}>No Results to Display</h1>
                <div id='resultsArtist'>
                    {results.map(result =>
                    //map through the results array and display via the item model
                        <Item 
                            link={result.external_urls.spotify}
                            imgSrc={result.images[0].url}
                            imgAlt={result.name}
                            title={result.name}
                        />
                    )}
                </div>
                <div id='resultsAlbum'>
                    {results.map(result => 
                    //map through the results array and display via the item model
                        <Item 
                            link={result.external_urls.spotify}
                            imgSrc={result.images[0].url}
                            imgAlt={result.name}
                            title={result.name}
                        />
                    )}
                </div>
                <div id='resultsAudio'>
                    {results.map(result =>
                    //map through the results array and display via the item model
                        <Item 
                            link={result.external_urls.spotify}
                            imgSrc={result.images[0].url}
                            imgAlt={result.name}
                            title={result.name}
                        />
                    )}

                </div>
            </div>
        </div>
    )
}

const styles = {
    imgContainer: {
        alignItems:'center'
    },
    searchBar: {
        display:'flex',
        flexDirection:'row',
        marginTop:'2%'
    },
    input: {
        backgroundColor:'#C73482',
        borderRadius:'0px 40px 40px 0px',
        color:'#FFFFFF',
        fontSize:18
    },
    display: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    searchTypes: {
        fontSize: 24,
        color:'#FFFFFF',
        textAlign:'center',
        marginBottom:'0',
        textTransform:'uppercase'
    },
    hrs: {
        border:'1px solid rgba(255,255,255,0.25)',
        width:'100%',
        marginBottom:'20px'
    },
    logBut: {
        marginLeft:'75%'
    },
    greeting: {
        color:'#FFFFFF'
    },
    nilRes: {
        fontSize: 24,
        color:'white',
        textAlign:'center',
        display:'block'
    }
}