import React, { Component } from 'react'
import { Input, Button, Icon, InputGroup, Container } from 'rsuite';

import "../App.css";
import { text } from 'body-parser';

//-----------------SPEECH RECOGNITION SETUP---------------------

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition();

recognition.continuous = true
recognition.interimResults = false
recognition.lang = 'en-US'

//------------------------COMPONENT-----------------------------

class Speech extends Component {

  constructor() {
    super()
    this.state = {
      listening: false,
      text: '',
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
  }

  toggleListen() {
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }

  handleListen() {

    console.log('listening?', this.state.listening)

    if (this.state.listening) {
      recognition.start()
      recognition.onend = () => {
        console.log("...continue listening...")
        recognition.start()
      }

    } else {
      recognition.stop()
      recognition.onend = () => {
        console.log("Stopped listening per click")
      }
    }

    recognition.onstart = () => {
      console.log("Listening!")
    }

    let finalTranscript = ''
    recognition.onresult = event => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }
      this.setState({ text: finalTranscript });
      console.log(this.state.text)
      let textarea = document.getElementById("transcript");
      textarea.value = this.state.text;

      //-------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(' ')
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log('stopCmd', stopCmd)

      if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
        recognition.stop()
        recognition.onend = () => {
          console.log('Stopped listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          this.setState({ text: finalText });
        }
      }
    }

    //-----------------------------------------------------------------------

    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }

  }

  childFunction(){
    this.props.functionCallFromParent("Hello From SpeechRecognition");
}

  render() {
    return (
      <Container className="p-10">
          <InputGroup className="no_border" style={{ width: 380, height: 75 }}>
            <InputGroup.Addon>
              <Icon onClick={this.toggleListen} icon="microphone" />
            </InputGroup.Addon>
            <Input id="transcript"/> 
          </InputGroup>
      </Container>
    )
  }
}



export default Speech