import React from 'react';

function Card(props) {
    
    return(
        <div className="d-inline-block a-card" onClick={(e) => props.onClick(props.item)}>
            <img className="a-card-image" src={props.item.itemSrc} alt={props.item.itemSrc}></img>
            {/* { props.item.selected && <CardInfo title={props.item.title} subTitle={props.item.subTitle} link={props.item.link}/>} */}
        </div>
    );


}

export default Card;