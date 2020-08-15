import React from 'react';
import Carousel from '../components/Carousel'
import SideBar from '../components/SideBar'

import "../App.css";
import Calendar from 'react-calendar';

class HomePage extends React.Component {


    state = {
        date: new Date(),
    }
    
    onChange = date => this.setState({ date })
    
    render() {
        return (
        <div>
            <SideBar />
                <div id="taskInfo">
                    <textarea id="textbox" rows="4" cols="50"></textarea>
                    <button class="button" type="submit">Voice Recognition</button>
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