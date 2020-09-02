import React from 'react';
import { Container } from 'react-bootstrap';
import DarkTheme from 'react-dark-theme'


function DarkModeToggle(props) {
    return (
        <Container className="d-flex justify-content-end align-middle h-40" >
            <DarkTheme light={props.lightTheme} dark={props.darkTheme} defaultDark="true" />
        </Container>
    )
}
export default DarkModeToggle;