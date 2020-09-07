import React from 'react';
import Calendar from 'react-calendar';
import { Row, Col } from 'react-bootstrap';
import { Header, Container, Icon, Button, Input, InputGroup, InputPicker, Divider } from 'rsuite';
import { createTheme } from 'react-dark-theme'
import Moment from 'moment';

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

var todoItems = ["learn react", "Go shopping", "buy flowers"];


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
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
        setInterval(this.handleLoad, 3000); //update task list every 3s
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
                // append user data to state array todoItems to display on carousel
                let tempList = [];
                for (let i = 0; i < data.list.length; i++) {
                    tempList.push(data.list[i]);
                }
                this.setState({ todoItems: tempList })
            })
            .catch(err => { console.error(err) })

    }

    // handle click on the calendar to set date
    onChange = date => {
        this.setState({ date });
    }

    //get date
    getDate = function () {
        Moment.locale('en');
        var dt = this.state.date;
        console.log(dt);
        return (
            Moment(this.state.date).format('dddd, MMM Do YYYY')
        );
    }

    handleChange = e => {
        this.setState({ [e.currentTarget.name]: e.target.value })
    }

    // handle toglge option to display/hide the speech-to-text feature
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
                    this.setState({ task: finalTranscript })
                } else {
                    interimTranscript += transcript;
                }
            }

            //document.querySelector('body').innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
            document.getElementById("voice content").innerHTML = finalTranscript + '' + interimTranscript;
        }
        recognition.start();

    }

    // get task details from <Speech />
    handleNewSpeech = (newTextFromSpeech) => {
        this.setState({ task: newTextFromSpeech })
    }

    handleDropdown = (value) => {
        this.setState({ priority: value })
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

    countTask = () => {
        return this.state.todoItems.length;
    }

    render() {
        let calWidth = 'calc(100% - 40px)';
        let myTheme = createTheme(darkTheme, lightTheme);
        if (!(this.state.render)) {
            console.log("Page is loading")
        }
        return (
            <Container className="h-100" style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
                <SideBar backgroundColor={myTheme.secondary} color={myTheme.text} lightTheme={lightTheme} darkTheme={darkTheme} />
                <Container>
                    <Row>
                        <Col sm={9} className="pt-20">
                            {/* User Greeting */}
                            <Header className="align theme_border p-10">
                                <h2 style={{ color: myTheme.popcolor }}>Hello {this.state.user}</h2>
                                <p>Let's get started with your day</p>
                                <p style={{ fontSize: "16pt" }}>In total, you have <span style={{ color: "red", fontSize: "18pt", fontWeight: "bold" }}>{this.countTask()}</span> pending task(s)</p>
                            </Header>

                            {/* Speech Recognition to add tasks */}
                            <Container fluid className="">
                                <div id="task-container" className="align p-10 dark_theme border-10">
                                    <Row id="taskInfo" className="pb-10 ">
                                        <Col sm={8}>
                                            {/* Speech Recognition */}
                                            <Speech newSpeech={this.handleNewSpeech} />
                                        </Col>

                                        <Col>
                                            {/* Show date pick from calendar */}
                                            <InputGroup className="pb-10 no_border">
                                                <InputGroup.Addon>
                                                    <Icon icon="calendar" />
                                                </InputGroup.Addon>
                                                <Input className="" name="date" placeholder="Due date" value={this.getDate()} onChange={this.handleChange} />
                                            </InputGroup>

                                            {/* Due date */}
                                            <InputPicker name="priority" className="no_border"
                                                placeholder="Priotity"
                                                onChange={this.handleDropdown}
                                                value={this.state.priority}
                                                inputRef={ref => { this.myDropdown = ref; }}
                                                // data={priority_list}
                                                block
                                            />
                                        </Col>
                                    </Row>

                                    {/* Submit */}
                                    <Button className="dark_theme_pop" type="submit" onClick={this.handleNewTask}>
                                        <Icon icon="plus" /> Add task
                                    </Button>
                                </div>
                            </Container>
                        </Col>


                        <Col sm={3} style={{ overflow: "hidden", position: "relative" }}>
                            {/* DarkModeToggle */}
                            <Row className="d-flex justify-content-end align-middle" style={{ height: "40px", paddingTop: "12px" }}>
                                <DarkModeToggle lightTheme={lightTheme} darkTheme={darkTheme} />
                            </Row>

                            <Row style={{ height: calWidth }}>
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
                    {/* <Container className="mt-10">
                        {this.createTable()}
                    </Container> */}
                    <Carousel date={this.getDate()} initItems={todoItems} />
                </Container>
            </Container>

        );

    }
}

export default DashboardPage;
