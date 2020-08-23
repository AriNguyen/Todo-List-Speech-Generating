import React from 'react';
import Carousel from '../components/Carousel'
import SideBar from '../components/SideBar'
import "../App.css";

function HomePage(props) {

    return (
        <div>
            <SideBar />
            <Carousel />
        </div>
    );
}

export default HomePage;