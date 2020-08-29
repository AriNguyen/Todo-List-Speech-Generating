import React from 'react';
import { ButtonToolbar, Icon, Button } from 'rsuite';

function ButtonToggles(props) {
    const buttonNames = props.buttonNames;
    const buttonIcons = props.buttonIcons;

    const ButtonsGroup = buttonNames.map((e, i) =>
        <Button className="dark_theme_pop_text">
            <Icon icon={buttonIcons[i]} /> {buttonNames[i]}
        </Button>
    );

    return (
        <div className="align">
            <ButtonToolbar>
                {ButtonsGroup}
            </ButtonToolbar>
        </div>
    );
}

export default ButtonToggles;

