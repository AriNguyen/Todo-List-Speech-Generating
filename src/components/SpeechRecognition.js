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

  constructor(props) {
    super(props)
    this.state = {
      listening: false,
      text: '',
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.changeIcon = this.changeIcon.bind(this)
  }

  handleChange = e => {
    let task = this.myInput.value;
    this.props.newSpeech(task);
    // this.setState({text: task})
  }

  toggleListen() {
    if( this.state.listening ){
      this.props.newSpeech(this.state.text)
    }

    this.setState({
      listening: !(this.state.listening),
    }, this.handleListen);
  }

  changeIcon() {
    let micro = document.getElementById("micro");
    if (micro.style.color == "red") {
      micro.style.color = "black";
    }
    else if (micro.style.color == "black") {
      micro.style.color = "red";
    }
  }

  handleButtonClick() {
    this.toggleListen();
    this.changeIcon();
    this.props.newSpeech(this.state.text)
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
          this.setState({
            listening: false,
            text: finalText
          });
          textarea.value = this.state.text;
          this.props.newSpeech(this.state.text)
          this.changeIcon();
        }
      }
    }

    //-----------------------------------------------------------------------

    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }
  }

  render() {
    return (
      <Container>
          <InputGroup className="no_border" style={{ height: 75 }}>
            <InputGroup.Addon onClick={this.handleButtonClick}>
              <Icon id="micro" icon="microphone" size="2x" style={{color: "black"}} />
            </InputGroup.Addon>
            <Input componentClass="textarea" rows={3}
              id="transcript"
              inputRef={ref => {this.myInput = ref;}}
              onChange={this.handleChange}
            />
          </InputGroup>
      </Container>
    )
  }
}

export default Speech
