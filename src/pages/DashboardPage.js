import React from 'react';
import Calendar from 'react-calendar';
import { Row, Col } from 'react-bootstrap';
import { Header, Container, Icon, Button, Input, InputGroup, InputPicker, Divider } from 'rsuite';
import { createTheme } from 'react-dark-theme'

import Speech from '../components/SpeechRecognition'
import Carousel from '../components/Carousel'
import SideBar from '../components/SideBar'
import DarkModeToggle from '../components/DarkModeToggle'

const white = "#FFFFFF";
const black = "#272b34";
const gray_black = "#272b34";
const gray = "#F8F8F9";
const dark_black = "#202229";
const green = "#1ffb7e";

const lightTheme = {
    background: white,
    text: black,
    secondary: gray,
    third: black,
    popcolor: "#14d969"
}

const darkTheme = {
    background: gray_black,
    text: white,
    secondary: dark_black,
    third: dark_black,
    popcolor: green
}


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            date: new Date(),
            priority: '',
            task: '',
            display: "hide",
            todoItems: [],
        }
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    handleLoad = e => {
        // e.preventDefault();
        this.setState({ 'user': window.location.search.split('=')[1] })

        // get user data from database and append to the DOM
        fetch('/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth': window.localStorage.getItem("token")
            },
            body: JSON.stringify({
                'user': this.state.user
            })
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                // append user data to array displayData
                let curTop = 0;
                let tempList = [];
                console.log(data)
                for (let i = 0; i < data.list.length; i++) {
                    tempList.push(data.list[i].task);
                }
                this.setState({ todoItems: tempList })
                console.log(this.state.todoItems)
            })
            .catch(err => { console.error(err) })
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
            // <div className="show-fake-browser sidebar-page">
            <Container className="h-100" style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
                <SideBar backgroundColor={myTheme.secondary} color={myTheme.text} lightTheme={lightTheme} darkTheme={darkTheme} />
                <Container>
                    <Row>
                        <Col sm={9} className="pt-20">
                            {/* User Greeting */}
                            <Header className="align theme_border p-10">
                                <h2 style={{ color: myTheme.popcolor }}>Hello {this.state.user}</h2>
                                <p>Let's get started with your day</p>
                                <p style={{ fontSize: "16pt" }}>You have <span style={{ color: "yellow", fontSize: "18pt", fontWeight: "bold" }}>4</span> tasks coming up today and <span style={{ color: "red", fontSize: "18pt", fontWeight: "bold" }}>2</span> pending task for yesterday</p>
                            </Header>

                            {/* Speech Recognition to add tasks */}
                            <Container fluid className="">
                                <div id="task-container" className="align p-10 dark_theme border-10">
                                    <Row id="taskInfo" className="pb-10 ">
                                        <Col sm={8}>
                                            {/* Speech Recognition */}
                                            <Speech />
                                        </Col>

                                        <Col>
                                            <InputGroup className="pb-10 no_border">
                                                <InputGroup.Addon>
                                                    <Icon icon="calendar" />
                                                </InputGroup.Addon>
                                                <Input className="" name="date" placeholder="Due date" value={this.state.date} onChange={this.handleChange} />
                                            </InputGroup>

                                            {/* Due date */}
                                            <InputPicker className="no_border" placeholder="Priotity" block />
                                        </Col>
                                    </Row>

                                    {/* Submit */}
                                    <Button className="dark_theme_pop" type="submit" onClick={this.handleNewTask}>
                                        <Icon icon="plus" /> Add task
                                        </Button>
                                </div>

                            </Container>
                        </Col>

                        <Col sm={3}>
                            {/* DarkModeToggle */}
                            <div>
                                <DarkModeToggle lightTheme={lightTheme} darkTheme={darkTheme} />
                            </div>


                            <Row className="mh-100">
                                {/* Calendar */}
                                <Calendar
                                    id="calendar"
                                    className="dark_theme border-10 p-10"
                                    onChange={this.onChange}
                                    value={this.state.date}
                                />
                            </Row>
                        </Col>
                    </Row>

                    {/* Tasks Containers */}
                    <Container >
                        <Row className="align">
                            <h3>This Week</h3>
                        </Row>
                        <Row >
                            <Carousel initItems={this.state.todoItems} date={this.state.date} />
                        </Row>

                        <Divider className="align" />

                        <Row className="align">
                            <h3>Next Week</h3>
                        </Row>
                        <Row>
                            <Carousel initItems={this.state.todoItems} date={this.state.date} />
                        </Row>
                    </Container>


                </Container>
            </Container>
            // </div >
        );
    }
}

export default DashboardPage;
