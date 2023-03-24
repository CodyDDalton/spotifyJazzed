export default function Item(props){
    return(
        <div style={styles.item}>
            <a href={props.link}><img src={props.imgSrc} alt={props.imgAlt} style={styles.img} /></a>
            <h5 style={styles.title}>{props.title}</h5>
        </div>
    )
}

const styles = {
    item: {
        paddingRight:'20px',
        marginTop:'0',
        wordWrap: "break-word"
        

    },
    img : {
        width:'100px',
        height:'100px',
        padding: '0'

    },
    title: {
        color:'white'

    }
}