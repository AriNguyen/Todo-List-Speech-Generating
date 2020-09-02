import React from 'react';
import { Container } from 'react-bootstrap';
import DarkTheme from 'react-dark-theme'


function DarkModeToggle(props) {
    return (
        <DarkTheme light={props.lightTheme} dark={props.darkTheme} defaultDark="true" />
    )
}
export default DarkModeToggle;