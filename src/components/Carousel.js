import React from 'react';

import Card from '../components/Card'
import { Container, Row } from 'react-bootstrap';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    id: 0,
                    title: 'Today',
                    subTitle: '',
                    link: '',
                    selected: false
                },
                {
                    id: 1,
                    title: 'Yesterday',
                    subTitle: '',
                    link: '',
                    selected: false
                },
            ]
        }
    }

    handleCardClick = (id, card) => {
        console.log(id);
        let items = [...this.state.items];

        items[id].selected = items(id).selected ? false : true;

        items.forEach(item => {
            if (item.id !== id) {
                item.selected = false;
            }
        });

        this.setState({
            items
        });
    }

    makeItems = (items) => {
        return items.map(item => {
            return <Card item={item} click={(e => this.handleCardClick(item.id, e))} key={item.id} initItems={this.props.initItems} title={item.title}/>
        })
    }

    render() {
        return (
            <Container className="p-0">
                <Row className="align justify-content-between">
                    {this.makeItems(this.state.items)}
                </Row>
            </Container>
        )
    }
}

export default Carousel;