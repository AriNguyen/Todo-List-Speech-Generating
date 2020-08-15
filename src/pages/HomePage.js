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
            <Carousel />
        </div>
        );
    }



}

export default HomePage;