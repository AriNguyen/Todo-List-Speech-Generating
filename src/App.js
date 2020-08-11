import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import styled from "@emotion/styled";
import './App.css';

import { useTheme } from "./components/ThemeContext";
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const Wrapper = styled("div")`
  background: ${props => props.theme.background};
  width: 100vw;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen";
  h1 {
    color: ${props => props.theme.body};
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Todo List',
      headerLinks: [
        { title: 'Home', path: '/' },
        { title: 'Login', path: '/login' },
      ],
      home: {
        title: 'Todo List',
        subTitle: 'Speech Generating Taks'
      },
      login: {
        title: 'Login'
      },
    }
    
  }
  
  // componentDidMount() {
  //   this.getProduct();
  // }

  // getProduct = () => {
  //   fetch("http://localhost:3000", {
  //     mode: 'no-cors',
  //   })
  //     .then(response => response.json())
  //     .then(response => console.log(response))
  //     .catch(err => console.error(err))
  // }

  // renderProduct = ({ product_id, name }) => <div> name </div>
  

  render() {
    return (
      <Router>
        <Container className='p-0' fluid={true}>

          <Navbar className="border-bottom" bg='transparent' expand='lg'>
            <Navbar.Brand>Todo List</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-toggle" className="border-0" />
            <Navbar.Collapse id="navbar-toggle">
              <Nav className='ml-auto'>
                <Link className='nav-link' to='/'>Home</Link>
                <Link className='nav-link' to='/login'>Login</Link>
              </Nav>
              {/* <Wrapper>
                <div>
                  <button onClick={() => this.theme.toggle()}>
                    {this.theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  </button>
                </div>
              </Wrapper> */}
            </Navbar.Collapse>
          </Navbar>

          <Route path="/" exact render={() => <HomePage title={this.state.home.title} />} subTitle={this.state.home.subTitle} />
          <Route path="/login" exact render={() => <LoginPage title={this.state.login.title} />} />

          <Footer />

        </Container>
      </Router>
    );
  }
}


export default App;
