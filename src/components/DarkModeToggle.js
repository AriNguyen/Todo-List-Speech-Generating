import React from 'react';
import {Navbar, Nav, Container } from 'react-bootstrap';
import DarkTheme from 'react-dark-theme'
// import { Container } from 'rsuite';


function DarkModeToggle(props) {
    return (
            <Container className="dark_theme d-flex justify-content-center pb-1 m-0">
                <DarkTheme light={props.lightTheme} dark={props.darkTheme} defaultDark="true" />
            </Container>
    )
}
export default DarkModeToggle;