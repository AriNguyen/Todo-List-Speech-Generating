import React from 'react';

import TodoApp from '../components/TodoApp'
import { Container } from 'react-bootstrap'

function Card(props) {
    return (
        <div className="d-inline-block a-card overflow-auto" style={{marginRight: "20px"}}>
            <Container className="p-20">
                <h4>{props.date}</h4>
                <p>{props.subTitle}</p>
            </Container>

            <TodoApp initItems={props.initItems} />
        </div>
    );
}

export default Card;