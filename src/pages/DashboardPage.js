import React from 'react';
import Calendar from 'react-calendar';
import { Row, Col } from 'react-bootstrap';
import { Header, Container } from 'rsuite';
import Speech from '../components/SpeechRecognition'
import Carousel from '../components/Carousel'
import SideBar from '../components/SideBar'
import DarkModeToggle from '../components/DarkModeToggle'
import "../App.css";
import ButtonToggles from '../components/ButtonToggles'

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
    popcolor: black
}

const darkTheme = {
    background: gray_black,
    text: white,
    secondary: dark_black,
    third: dark_black,
    popcolor: "#1ffb7e"
}

var todoItems = ["learn react", "Go shopping", "buy flowers"];


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            date: new Date(),
            priority: '',
            task: '',
            display: "hide",
        }
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    handleLoad = e => {
        // e.preventDefault();
        this.setState({ 'user': window.location.search.split('=')[1] })

        // get user data from database and append to the DOM

    }

    // handle click on the calendar to set date
    onChange = date => this.setState({ date })

    handleChange = e => {
        this.setState({ [e.currentTarget.name]: e.target.value })
    }


    // send username and new task info to /add in server
    // handleNewTask = e => {
    // handle toglge option to display/hide the speech-to-text feature
    handleVoice() {
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

    // send username and new task info to /add in server
    handleNewTask = e => {
        e.preventDefault();

        fetch("/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth': window.localStorage.token,
            },
            body: JSON.stringify({
                'user': this.state.user,
                'date': this.state.date,
                'priority': this.state.priority,
                'task': this.state.task,
            })
        })
            .then(res => {
                console.log(res.status);
            })
            .catch(err => { console.error(err) })

        // remove all inputs from the add task area
        this.setState({
            date: new Date(),
            priority: '',
            task: '',
            display: 'hide',
        })
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
                            <Col sm={9} className="p-10">
                                {/* Speech Recognition to add tasks */}
                                <Container fluid className="m-10">
                                    <div id="task-container" className="align dark_theme theme_border">
                                        <div id="taskInfo">
                                            <label for="date" className="label">Due date</label>
                                            <input
                                                type="text"
                                                name="date"
                                                value={this.state.date}
                                                onChange={this.handleChange}></input>
                                            <label for="priority" className="label">Priority (from most to least important)</label>
                                            <select name="priority" value={this.state.priority} onChange={this.handleChange}>
                                                <option value=''>---Select---</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                            <label for="task" class="label">Task</label>
                                            <textarea
                                                name="task"
                                                class="task content"
                                                rows="4" cols="50"
                                                value={this.state.task}
                                                onChange={this.handleChange}></textarea>
                                        </div>
                                        <Speech />
                                        <button class="button submit dark_theme_pop" type="submit" onClick={this.handleNewTask} >Submit</button>
                                    </div>

                                </Container>

                                {/* Tasks Containers */}
                                <ButtonToggles buttonNames={["Add new task", "Create a new list"]} buttonIcons={["plus", "list-ol"]} />

                                {/* Tasks Containers */}
                                <Carousel initItems={todoItems} />
                            </Col>


                            <Col sm={3}>
                                {/* DarkModeToggle */}
                                <DarkModeToggle lightTheme={lightTheme} darkTheme={darkTheme} />

                                {/* Calendar */}
                                <div id="calendar" className="p-0">
                                    <Calendar
                                        onChange={this.onChange}
                                        value={this.state.date}
                                        className="dark_theme"
                                    />
                                </div>

                                {/* Priority tasks */}
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
