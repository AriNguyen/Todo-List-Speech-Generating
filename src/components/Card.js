import React from 'react';

import TodoApp from '../components/TodoApp'
import { Container } from 'rsuite'

function Card(props) {
    return (
        <div className="d-inline-block a-card overflow-auto" >
            <h4>{props.date}</h4>
            <p>{props.subTitle}</p>
            <TodoApp initItems={props.initItems} />
        </div>
    );
}

export default Card;