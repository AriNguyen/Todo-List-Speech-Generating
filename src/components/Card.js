import React from 'react';

import TodoApp from '../components/TodoApp'
import { Container } from 'rsuite'

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
      <div className="d-inline-block a-card overflow-auto" >
      <h4>{this.props.date}</h4>
      <p>{this.props.subTitle}</p>
      <TodoApp initItems={this.props.initItems} />
      </div>
    );
  }
}

export default Card;
