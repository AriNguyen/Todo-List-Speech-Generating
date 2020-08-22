import React from 'react';
import Calendar from 'react-calendar';
import { Row, Col } from 'react-bootstrap';
import { Header, Container } from 'rsuite';

import Carousel from '../components/Carousel'
import TodoApp from '../components/TodoApp'
import SideBar from '../components/SideBar'
import DarkModeToggle from '../components/DarkModeToggle'

import { createTheme } from 'react-dark-theme'

const white = "#FFFFFF";
const black = "#272b34";
const gray_black = "#272b34";
// const gray_black2 = "#393c47";
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

var todoItems = [];
todoItems.push({ index: 1, value: "learn react", done: false });
todoItems.push({ index: 2, value: "Go shopping", done: true });
todoItems.push({ index: 3, value: "buy flowers", done: true });


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }

    onChange = date => this.setState({ date })

    speechRecognition = function(){
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        let finalTranscript = '';
        let recognition = new window.SpeechRecognition();

        recognition.interimResults = true;
        recognition.maxAlternatives = 10;
        recognition.continuous = true;

        recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
            let transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        //document.querySelector('body').innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
        document.getElementById("textbox").innerHTML = finalTranscript + '' + interimTranscript;        
        }
        recognition.start();
    }

    render() {
        let myTheme = createTheme(darkTheme, lightTheme);
        return (
            <div className="show-fake-browser sidebar-page h-100">
                <Container className="h-100" style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
                    <SideBar backgroundColor={myTheme.secondary} color={myTheme.text} />
                    <Container>
                        <Header>
                            {/* <h2>Page Title</h2> */}
                        </Header>

                        <Row>
                            <Col sm={9}>
                                <div id="taskInfo">
                                    <div id="task-container">
                                        
                                        <label for="textbox" class="label">Task</label>
                                        <textarea class="task content" rows="4" cols="50"></textarea>
                                    </div>
                                    <button class="button" type="submit" onClick={this.speechRecognition}>Voice Recognition</button>
                                    <button class="button" type="submit">Submit</button>
                                </div>
                                <Carousel />
                            </Col>
                            <Col sm={3}>
                                <DarkModeToggle lightTheme={lightTheme} darkTheme={darkTheme} />

                                <div id="calendar" className="p-0">
                                    <Calendar
                                        onChange={this.onChange}
                                        value={this.state.date}
                                    />
                                </div>
                                <TodoApp initItems={todoItems} />
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </div >
        );
    }
}

export default DashboardPage;