import Icon from '../images/spotifyAppLogo.png';
import {useState} from 'react'
import axios from 'axios';
import Item from '../models/Item';

export default function Results(props){
    const [selected, setSelected] = useState("artist")
    const [input, setInput] = useState("")
    const [results, setResults] =useState([]);

    const getResults = async (res, req) =>{
        axios.get(`https://api.spotify.com/v1/search?q=${input}&type=${selected}&maret=US`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+props.accessToken,
            },
        })
        .then(response => {
            if(response.data.length !== 0){
                    document.getElementById("nilRes").style.display = 'none';
            }
            if(selected === 'artist'){
                const items = response.data.artists.items;
                const data = [];
                for(let i = 0; i <= 4; i++){
                    let item = items[i];
                    if(item.images[0].url.length !== 0){
                        data.push(item)
                    }
                }
                setResults(data)
            }
            if(selected === 'album'){
                const items = response.data.albums.items;
                const data = [];
                for(let i = 0; i <= 4; i++){
                    let item = items[i];
                    if(item.images[0].url.length !== 0){
                        data.push(item)
                    }
                }
                setResults(data)
            }
            if(selected === 'audiobook'){
                const items = response.data.audiobooks.items;
                const data = [];
                for(let i = 0; i <= 4; i++){
                    let item = items[i];
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
        const selection = event.target.value;
        setSelected(`${selection}`);
        if(event.target.value === 'artist'){
            document.getElementById('resultsTrack').style.display = 'none';
            document.getElementById('resultsAlbum').style.display = 'none';
            document.getElementById('resultsArtist').style.display = 'flex';
        }
        if(event.target.value === 'album'){
            document.getElementById('resultsTrack').style.display = 'none';
            document.getElementById('resultsAlbum').style.display = 'flex';
            document.getElementById('resultsArtist').style.display = 'none';
        }
        if(event.target.value === 'audiobook'){
            document.getElementById('resultsTrack').style.display = 'flex';
            document.getElementById('resultsAlbum').style.display = 'none';
            document.getElementById('resultsArtist').style.display = 'none';
        }
    }

    const handleInput = (input) => {
        setInput(input)
        getResults()
    }

    return(
        <div style={styles.interface}>
            <div style={styles.logBut}>
                <p style={styles.greeting}>Welcome back, <br></br>{props.name}</p>
                <button style={styles.logout} onClick={props.logout}>Log Out</button>
            </div>
            <div style={styles.imgContainer}>
                <a href='/'><img src={Icon} alt="Spotify Jazzed" style={styles.icon}></img></a>
            </div>
            <div style={styles.searchBar}>
                <select style={styles.select} onChange={handleSelect}>
                    <option defaultValue disabled>------</option>
                    <option value='artist'>artist</option>
                    <option value='album'>album</option>
                    <option value='audiobook'>audiobook</option>
                </select>
                <input style={styles.input} onChange={e => handleInput(e.target.value)} value={input}></input>
            </div>
            <div style={styles.display}>
                <h2 style={styles.searchTypes}>{selected} - {input}</h2>
                <hr style={styles.hrs}></hr>
                <h1 id='nilRes' style={styles.nilRes}>No Results to Display</h1>
                <div id='resultsArtist'>
                    {results.map(result =>
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
    interface: {
        backgroundColor:'rgb(0,0,0)',
        height:'100vh',
        marginLeft:'10%',
        marginRight:'10%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    imgContainer: {
        alignItems:'center'
    },
    icon: {
        width:'25%',
        marginTop:'5%',
        cursor:'pointer'
    },
    searchBar: {
        display:'flex',
        flexDirection:'row',
        marginTop:'2%'
    },
    select: {
        backgroundColor:'#C73482',
        fontSize: 14,
        color:'#FFFFFF',
        textTransform:'uppercase',
        borderRadius:'40px 0px 0px 40px',
        padding:'5px'
    },
    input: {
        backgroundColor:'#C73482',
        borderRadius:'0px 40px 40px 0px',
        color:'#FFFFFF',
        fontSize:18,
        textTransform:'uppercase'
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
        textTransform:'uppercase',
        marginBottom:'0'
    },
    hrs: {
        border:'1px solid rgba(255,255,255,0.25)',
        width:'100%',
        marginBottom:'100px'
    },
    logBut: {
        marginLeft:'75%'
    },
    greeting: {
        color:'#FFFFFF',
        textTransform:'uppercase'
    },
    logout:{
        backgroundColor: '#C73482',
        color:'white',
        textTransform:'uppercase',
        textDecoration:'none',
        marginBottom:'2%',
        padding:'10px',
        fontSize: 18,
        borderRadius:'20px',
        cursor:'pointer'
    },
    nilRes: {
        fontSize: 24,
        color:'white',
        textAlign:'center',
        display:'block'

    }
}