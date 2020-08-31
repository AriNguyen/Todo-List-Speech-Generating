import React, {Component} from 'react';
import DashboardPage from './pages/DashboardPage';
import Speech from './components/SpeechRecognition';

class Parent extends Component{
    constructor(props){
        super(props);
        this.state={
            transcript: ""
        }
    }
    parentFunction=(data_from_child)=>{
        this.setState({transcript: data_from_child});
    }
    render(){
        return(
            <div>      
                <Speech functionCallFromParent={this.parentFunction.bind(this)}/>
                <DashboardPage valueFromParent={this.state.transcript}/>
            </div>
        );
    }
}
export default Parent;