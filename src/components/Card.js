import React from 'react';

import TodoApp from '../components/TodoApp'
import { Container } from 'react-bootstrap'

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    }
    console.log(this.props.initItems)
    // if( this.props.initItems ){
    //   this.update;
    // }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    this.setState({items: nextProps.initItems})
  }

  render() {
    console.log(this.props.initItems)
    return (
        <div className="d-inline-block a-card overflow-auto" style={{marginRight: "20px"}}>
            <Container className="p-20">
                <h4>{this.props.date}</h4>
                <p>{this.props.subTitle}</p>
            </Container>

            <TodoApp initItems={this.props.initItems} />
        </div>
    );
  }
}

export default Card;
