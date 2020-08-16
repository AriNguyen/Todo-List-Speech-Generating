import React from 'react';
import Calendar from 'react-calendar';
import { Row, Col } from 'react-bootstrap';
import { Header, Container } from 'rsuite';

import Carousel from '../components/Carousel'
import TodoApp from '../components/TodoApp'
import SideBar from '../components/SideBar'
import NavBar from '../components/Navbar'

import {DarkTheme, createTheme} from 'react-dark-theme'

const white = "#FFFFFF";
const black = "#272b34";
const gray_black = "#272b34";
const gray_black2 = "#393c47";
const gray = "#F8F8F9";
const dark_black = "#202229";

const lightTheme = {
    background: white,
    text: black,
    secondary: gray,
    third: black,
}

const darkTheme = {
    background: gray_black,
    text: white,
    secondary: dark_black,
    third: dark_black,
}


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }

    onChange = date => this.setState({ date })

    render() {
        let myTheme = createTheme(darkTheme, lightTheme);
        return (
            <div className="show-fake-browser sidebar-page h-100">
                <Container className="h-100" style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
                    <SideBar backgroundColor={myTheme.secondary} color={myTheme.text} />
                    <Container>
                        <NavBar lightTheme={lightTheme} darkTheme={darkTheme} />

                        <Header>
                            {/* <h2>Page Title</h2> */}
                        </Header>

                        <Row>
                            <Col sm={9}>
                                <Carousel />
                            </Col>
                            <Col sm={3}>
                                {/* <TodoApp initItems={todoItems} /> */}
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </div >
        );
    }
}

export default DashboardPage;