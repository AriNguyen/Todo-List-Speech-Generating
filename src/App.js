import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

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

const myTheme = createTheme(darkTheme, lightTheme);


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
        subTitle: 'Speech Generating Task'
      },
      login: {
        title: 'Login'
      },
    }
  }

 
  render() {
    return (
      <Router>
        <Container className='p-0' fluid={true}>
          <Route path="/" exact render={() => <LoginPage title={this.state.login.title} data={this.state}/>} />
          <Route path="/dashboard" exact render={() => <DashboardPage title={this.state.login.title} data={this.state}/>} />
        </Container>
      </Router>
    );
  }
}


export default App;
