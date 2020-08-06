import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    fetch("http://localhost:4000", {
      mode: 'no-cors',
    })
    .then( response => response.json())
    .then( response => console.log( response))
    .catch( err => console.error(err))
  }

  renderProduct = ({product_id, name}) => <div> name </div>

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        {products.map(this.renderProduct)}
      </div>
    );
  }
}

export default App;
