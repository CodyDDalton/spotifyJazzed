export default function Item(props){
    //props sent from the results layout
    return(
        <div id="item">
            <a href={props.link}><img src={props.imgSrc} alt={props.imgAlt} id='img'/></a>
            <h5 id='title'>{props.title}</h5>
        </div>
    )
}