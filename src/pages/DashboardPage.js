import React from 'react';
import Calendar from 'react-calendar';
import { Row, Col } from 'react-bootstrap';
import { Header, Container } from 'rsuite';

import Carousel from '../components/Carousel'
import TodoApp from '../components/TodoApp'
import SideBar from '../components/SideBar'
import ButtonToggles from '../components/ButtonToggles'
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
            display: "hide",
        }
    }

    onChange = date => {
        this.setState({ date });
    }
    

    handleClick() {
        if (this.state.display === "hide") {
            this.setState({
                display: this.state.display = "show"
            })
        } else {
            this.setState({
                display: this.state.display = "hide"
            })
        }
    }

    speechRecognition = function () {
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
            document.getElementById("voice content").innerHTML = finalTranscript + '' + interimTranscript;
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
                                {/* Speech Recognition to add tasks */}
                                <div>
                                    <div id="task-container">
                                        <div id="taskInfo">
                                            <label for="date" className="label">Date</label>
                                            <input type="text" name="date"></input>
                                            <label for="priority" className="label">Priority</label>
                                            <select name="priority">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                            <label for="textbox" class="label">Task</label>
                                            <textarea class="task content" rows="4" cols="50"></textarea>
                                        </div>

                                        <div className={`voice-container ${this.state.display}`}>
                                            <div>
                                                <label for="textbox" className="label">Voice content</label>
                                                <textarea id="voice content" rows="4" cols="50"></textarea>
                                            </div>
                                            <button class="button start" type="submit" onClick={this.speechRecognition}>Start</button>
                                            <button class="button stop" type="submit" >Stop</button>
                                            <button class="button load" type="submit">Load</button>

                                        </div>

                                        <button class="button voice" type="submit" onClick={() => this.handleClick()}>Voice Recognition</button>
                                        <button class="button submit" type="submit">Submit</button>


                                    </div>
                                </div>

                                {/* Tasks Containers */}
                                <ButtonToggles buttonNames={["Add new task", "Create a new list"]} buttonIcons={["plus", "list-ol"]}/>

                                {/* Tasks Containers */}
                                <Carousel />
                            </Col>


                            <Col sm={3}>
                                {/* DarkModeToggle */}
                                <DarkModeToggle lightTheme={lightTheme} darkTheme={darkTheme} />
                                
                                {/* Calendar */}
                                <div id="calendar" className="p-0">
                                    <Calendar
                                        onChange={this.onChange}
                                        value={this.state.date}
                                    />
                                </div>

                                {/* Priority tasks */}
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