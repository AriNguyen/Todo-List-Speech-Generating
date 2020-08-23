import React from 'react';
import Carousel from '../components/Carousel'
import SideBar from '../components/SideBar'

import "../App.css";
import Calendar from 'react-calendar';

class HomePage extends React.Component {


    state = {
        date: new Date(),
        hide: true,
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
        return (
        <div>
            <SideBar />
                <div id="taskInfo">
                    <textarea id="textbox" rows="4" cols="50"></textarea>
                    <button class="button" type="click" onClick={this.speechRecognition}>Voice Recognition</button>
                    <button class="button" type="submit">Submit</button>
                    <div id="calendar">
                        <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                        />
                    </div>
                </div>
            
            <Carousel />
        </div>
        );
    }
}

export default HomePage;