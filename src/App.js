import React from 'react';
import DarkTheme, { createTheme } from 'react-dark-theme'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './App.css';

import Footer from './components/Footer';
import SideBar from './components/SideBar';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const white = "#FFFFFF";
const black = "#272b34";
const gray_black = "#272b34";
const gray_black2 = "#393c47";
const gray = "#F8F8F9";
const dark_black = "#202229";

const lightTheme = {
  background: white,
  text: black,
  secondary: white,
  third: black,
}

const darkTheme = {
  background: gray_black,
  text: white,
  secondary: dark_black,
  third: dark_black,
}

const myTheme = createTheme(darkTheme, lightTheme)



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Todo List',
      headerLinks: [
        { title: 'DashBoard', path: '/' },
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
        <Container className='p-0' fluid={true} style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
          <Navbar className="" bg='transparent' expand='lg'>
            <Navbar.Brand>Todo List</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-toggle" className="border-0" />
            <Navbar.Collapse id="navbar-toggle">
              <Nav className='ml-auto'>
                <Link className='nav-link' to='/'>Dashboard</Link>
                <Link className='nav-link' to='/login'>Login</Link>
              </Nav>
              <DarkTheme light={lightTheme} dark={darkTheme} />
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
