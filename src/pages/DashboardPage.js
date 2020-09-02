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
var priority_list = [
  {
    "label": "1 (most important)",
    "value": "1"
  },
  {
    "label": "2",
    "value": "2"
  },
  {
    "label": "3",
    "value": "3"
  },
  {
    "label": "4",
    "value": "4"
  }
]

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
        window.addEventListener('load', this.handleLoad);
    }

    // componentWillMount() {
    //     window.addEventListener('load', this.handleLoad);
    // }

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
      .then( res => {
        return res.json();
      })
      .then( data => {
      // append user data to state array todoItems to display on carousel
        let curTop = 0;
        let tempList = [];
        // console.log(data)
        for( let i = 0; i < data.list.length; i++ ){
          tempList.push(data.list[i].task);
        }
        this.setState({todoItems: tempList})
      })
      .catch(err => {console.error(err)})
    }

    // handle click on the calendar to set date
    onChange = date => this.setState({ date })

    handleChange = e => {
        this.setState({ [e.currentTarget.name]: e.target.value })
    }


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

    // get task details from <Speech />
    handleNewSpeech = (newTextFromSpeech) => {
      this.setState({task: newTextFromSpeech})
      console.log(this.state)
    }

    handleDropdown = (value) => {
      this.setState({priority: value})
      console.log(value)
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
                        <Row>
                            <Col sm={9} className="m-10">
                                {/* User Greeting */}
                                <Header className="align theme_border">
                                    <h2 style={{ color: myTheme.popcolor }}>Hello {this.state.user}</h2>
                                    <p>Let's get started with your day</p>
                                    <p style={{ fontSize: "16pt" }}>You have <span style={{ color: "yellow", fontSize: "18pt", fontWeight: "bold" }}>4</span> tasks coming up today and <span style={{ color: "red", fontSize: "18pt", fontWeight: "bold" }}>2</span> pending task for yesterday</p>
                                </Header>

                                {/* Speech Recognition to add tasks */}
                                <Container fluid className="m-10 ">
                                    <div id="task-container" className="align dark_theme">
                                        <Row id="taskInfo" className="pb-10">
                                            <Col sm={7}>
                                                {/* Speech Recognition */}
                                                <Speech newSpeech={this.handleNewSpeech} />

                                            </Col>

                                            <Col sm={4}>
                                                <InputGroup className="pb-10 no_border fit">
                                                    <InputGroup.Addon>
                                                        <Icon icon="calendar" />
                                                    </InputGroup.Addon>
                                                    <Input className="" name="date" placeholder="Due date" value={this.state.date} onChange={this.handleChange} />
                                                </InputGroup>

                                                {/* Due date */}
                                                <InputPicker name="priority" className="no_border fit"
                                                  placeholder="Priotity"
                                                  onChange={this.handleDropdown}
                                                  value={this.state.priority}
                                                  inputRef={ref => {this.myDropdown = ref;}}
                                                  data={priority_list}
                                                />

                                            </Col>
                                        </Row>

                                        {/* Submit */}
                                        <Button className="dark_theme_pop" type="submit" onClick={this.handleNewTask}>
                                            <Icon icon="plus" /> Add task
                                        </Button>
                                    </div>

                                </Container>

                                {/* Tasks Containers */}
                                <Carousel initItems={this.state.todoItems} />
                                <div>{this.state.todoItems} </div>
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
