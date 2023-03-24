import Icon from '../images/spotifyAppLogo.png';

export default function Login(props){
    return(
        <div style={styles.back}>
            <header style={styles.interface}>
                <div style={styles.imgContainer}>
                    <a href='/'><img src={Icon} alt="spotify jazzed" style={styles.icon} /></a>
                </div>
                <div style={styles.loginZone}>
                    <hr style={styles.hr}></hr>
                    <h2 style={styles.loginMsg}>To use Spotify Jazzed you must login to Spotify:</h2>
                    <a href={props.href} style={styles.login}>Login</a> 
                </div>
            </header>
        </div>
    )
}

const styles = {
    back: {
        backgroundColor:'rgb(0,0,0)',
        height:'100vh',
        marginLeft:'10%',
        marginRight:'10%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    interface: {
        display:'flex',
        flexDirection: 'column',
        backgroundColor:'rgb(0,0,0)',
        padding:'10px',
        borderRadius:'40px',
        marginRight:'25%',
        marginLeft:'25%',
        marginTop:'10%'
    },
    imgContainer: {
        alignItems:'center',
        marginTop:'2%',
        marginBottom:'2%'
    },
    icon: {
        width:'25%',
        cursor:'pointer'
    },
    loginZone: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    hr: {
        border: '1px solid rgba(255,255,255,0.25)',
        width:'75%'
    },
    loginMsg: {
        fontSize: 24,
        color: 'white',
        textAlign:'center'
    },
    login: {
        backgroundColor: '#C73482',
        color:'white',
        textTransform:'uppercase',
        textDecoration:'none',
        marginBottom:'2%',
        padding:'10px',
        fontSize: 18,
        borderRadius:'20px'
    }
}