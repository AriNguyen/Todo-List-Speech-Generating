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
            render: false,
            user: '',
            date: new Date(),
            priority: '',
            task: '',
            display: "hide",
            todoItems: [],
        }
        //window.addEventListener('load', this.handleLoad);
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
        // setInterval(this.handleLoad, 3000); //update task list every 3s
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
    onChange = date => this.setState({ date })

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
                    this.setState({task: finalTranscript})
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

    createTable = () => {
      var items = this.state.todoItems;
      var date_ord = [];

      // sort tasks by date
      items.sort( (a, b) => {
        return new Date(a.date) - new Date(b.date);
      })

      // group tasks by date
      for( let i = 0; i < items.length; i++ ){
        let cur_date = items[i].date;
        if( date_ord.length === 0 ){
          date_ord.push({
            date: items[i].date,
            detail: [{
              priority: items[i].priority,
              task: items[i].task
            }]
          })
        }else{
          let same_date = false;
          for( let z = 0; z < date_ord.length; z++ ){
            if( cur_date === date_ord[z].date ){
              same_date = true;
              date_ord[z].detail.push({
                priority: items[i].priority,
                task: items[i].task
              });
            }
          }
          if( same_date ){
            same_date = false;
          }else{
            date_ord.push({
              date: items[i].date,
              detail: [{
                priority: items[i].priority,
                task: items[i].task
              }]
            })
          }
        }
      }

      // sort tasks by priority
      for( let i = 0; i < date_ord.length; i++ ){
        for( let z = 0; z < date_ord[i].detail.length; z++ ){
          date_ord[i].detail.sort( (a,b) => {
            if( (a.priority - b.priority) < 0 ){
              return -1
            }else{
              return 1
            }
          })
        }
      }

      return (
        <div>
        {date_ord.map( function(by_date, i) {
          return (
            <table className="bigTable dark_theme"> {by_date.date}
            <tbody className="smallTable dark_theme">
            <tr className="row-content">
            <th className="col-priority ">Priority</th>
            <th className="col-task">Task</th>
            </tr>
            {by_date.detail.map(function (item, index) {
              return (
                <tr className="row-content" >
                <td className="col-priority"> {item.priority} </td>
                <td className="col-content"> {item.task} </td>
                </tr>
              )
            })}
            </tbody>
            </table>
          )
        })}
        </div>
      );

    }

    countTask = () => {
      return this.state.todoItems.length;
    }

    render() {
        let calWidth = 'calc(100% - 40px)';
        let myTheme = createTheme(darkTheme, lightTheme);
        if(!(this.state.render)) {
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
                                                <Input className="" name="date" placeholder="Due date" value={this.state.date} onChange={this.handleChange} />
                                            </InputGroup>

                                            {/* Due date */}
                                            <InputPicker name="priority" className="no_border"
                                                placeholder="Priotity"
                                                onChange={this.handleDropdown}
                                                value={this.state.priority}
                                                inputRef={ref => { this.myDropdown = ref; }}
                                                data={priority_list}
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


                        <Col sm={3} style={{overflow: "hidden", position: "relative"}}>
                            {/* DarkModeToggle */}
                            <Row className="d-flex justify-content-end align-middle" style={{height: "40px",  paddingTop: "12px"}}>
                                <DarkModeToggle lightTheme={lightTheme} darkTheme={darkTheme} />
                            </Row>

                            <Row style={{height: calWidth}}>
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
                    <Container className="mt-10">
                        {this.createTable()}
                    </Container>
                </Container>
            </Container>

        );

    }
}

export default DashboardPage;
