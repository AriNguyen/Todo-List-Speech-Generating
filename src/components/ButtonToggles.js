import React from 'react';
import { ButtonToolbar, Icon, Button } from 'rsuite';
import { Container } from 'react-bootstrap';

function ButtonToggles(props) {
    const buttonNames = props.buttonNames;
    const buttonIcons = props.buttonIcons;

    const ButtonsGroup = buttonNames.map((e, i) =>
        <Button color="black" appearance="ghost">
            <Icon icon={buttonIcons[i]} /> {buttonNames[i]}
        </Button>
    );


    return (
        <Container className="p-10">
            <div>
                <ButtonToolbar>
                    {ButtonsGroup}
                </ButtonToolbar>
            </div>
        </Container>
    );
}

export default ButtonToggles;

