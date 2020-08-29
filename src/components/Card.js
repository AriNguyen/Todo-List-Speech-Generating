import React from 'react';

import TodoApp from '../components/TodoApp'

function Card(props) {
    return(
        <div className="d-inline-block a-card overflow-auto" onClick={(e) => props.onClick(props.item)}>
            {/* <img className="a-card-image" src={props.item.itemSrc} alt={props.item.itemSrc}></img> */}
            {/* { props.item.selected && <CardInfo title={props.item.title} subTitle={props.item.subTitle} link={props.item.link}/>} */}
            <TodoApp initItems={props.initItems} title={props.title}/>
        </div>
    );}

export default Card;