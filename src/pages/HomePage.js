import React, { Component } from 'react';
import "../App.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class HomePage extends React.Component {


    state = {
        date: new Date(),
    }
    
    onChange = date => this.setState({ date })
    
    render() {
        return (
        <div>
            <textarea id="textbox" rows="4" cols="50"></textarea>
            <button button class="button" type="submit">Voice Recognition</button>
            <button button class="button" type="submit">Submit</button>
            <div id="calendar">
                <Calendar
                onChange={this.onChange}
                value={this.state.date}
                />
            </div>
        </div>
        );
    }



}

export default HomePage;