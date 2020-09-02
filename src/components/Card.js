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

  update = () => {

  }

  render() {
    console.log(this.props.initItems)
    let temp = ["dcm", "d chay nua", "thi chiu"]
    return (
        <div className="d-inline-block a-card overflow-auto" style={{marginRight: "20px"}}>
            <Container className="p-20">
                <h4>{props.date}</h4>
                <p>{props.subTitle}</p>
            </Container>

            <TodoApp initItems={this.props.initItems} />
        </div>
    );
  }
}

export default Card;
