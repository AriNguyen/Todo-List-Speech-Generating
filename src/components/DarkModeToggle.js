import React from 'react';
import {Navbar, Nav } from 'react-bootstrap';
import DarkTheme from 'react-dark-theme'


function DarkModeToggle(props) {
    return (
        <Navbar className="" bg='transparent' expand='lg'>
            <Navbar.Toggle aria-controls="navbar-toggle" className="dark_theme_pop border-0" checked/>
            <Navbar.Collapse id="navbar-toggle">
                <Nav className='ml-auto'></Nav>
                <DarkTheme light={props.lightTheme} dark={props.darkTheme} />
            </Navbar.Collapse>
        </Navbar>
    )
}
export default DarkModeToggle;