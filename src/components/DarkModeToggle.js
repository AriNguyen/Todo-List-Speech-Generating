import React from 'react';
import {Navbar, Nav } from 'react-bootstrap';
import DarkTheme from 'react-dark-theme'


function DarkModeToggle(props) {
    return (
        <Navbar className="" bg='transparent' expand='lg'>
            <Nav className='ml-auto'>
                <DarkTheme light={props.lightTheme} dark={props.darkTheme} defaultDark="true"/>
            </Nav>
        </Navbar>
    )
}
export default DarkModeToggle;