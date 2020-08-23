import React from 'react';

function Button(props) {
    return (
        <div>
            <ButtonToolbar>
                <IconButton icon={<Icon icon="star" />} />
                <IconButton icon={<Icon icon="star" />} appearance="primary" />
                <ButtonGroup>
                    <IconButton icon={<Icon icon="align-left" />} />
                    <IconButton icon={<Icon icon="align-center" />} />
                    <IconButton icon={<Icon icon="align-right" />} />
                    <IconButton icon={<Icon icon="align-justify" />} />
                </ButtonGroup>
            </ButtonToolbar>
        </div>
    )
}

export default Button;

