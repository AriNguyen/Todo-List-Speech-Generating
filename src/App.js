import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';


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
        <Container className='h-100 p-0' fluid={true}>
          <Route path="/" exact render={() => <LoginPage title={this.state.login.title} data={this.state}/>} />
          <Route path="/dashboard" exact render={() => <DashboardPage title={this.state.login.title} data={this.state}/>} />
        </Container>
      </Router>
    );
  }
}

export default App;
