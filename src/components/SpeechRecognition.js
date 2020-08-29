import React, { Component } from 'react'
import "../App.css";

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
      this.setState({text: finalTranscript});
      console.log(this.state.text)

    //-------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(' ')
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log('stopCmd', stopCmd)

      if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
        recognition.stop()
        recognition.onend = () => {
          console.log('Stopped listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          this.setState({text: finalText});
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
      <div>
        <label for="textbox" className="label">Voice content</label>
        <div id="transcript">{this.state.text} 
        </div>
        <button class="button submit" onClick={this.toggleListen} >Voice Recognition</button>
      </div>
    )
  }
}

//-------------------------CSS------------------------------------

// const styles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       textAlign: 'center'
//     },
//     button: {
//       width: '60px',
//       height: '60px',
//       background: 'lightblue',
//       borderRadius: '50%',
//       margin: '6em 0 2em 0'
//     },
//     interim: {
//       color: 'gray',
//       border: '#ccc 1px solid',
//       padding: '1em',
//       margin: '1em',
//       width: '300px'
//     },
//     final: {
//       color: 'black',
//       border: '#ccc 1px solid',
//       padding: '1em',
//       margin: '1em',
//       width: '300px'
//     }
//   }
  
//   const { container, button, interim, final } = styles

export default Speech