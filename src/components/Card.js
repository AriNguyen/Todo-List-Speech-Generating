import React from 'react';

import TodoApp from '../components/TodoApp'

function Card(props) {
  console.log(props.initItems)
    return (
        <div className="d-inline-block a-card overflow-auto" >
            <TodoApp initItems={props.initItems} title={props.title} />
        </div>
    );
}

export default Card;
