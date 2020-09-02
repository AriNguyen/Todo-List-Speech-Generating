import React from 'react';

import Card from '../components/Card'
import { Container, Row, Col } from 'react-bootstrap';


class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.itemsList = [
            {
                id: 0,
                date: 'Today',
                subTitle: JSON.stringify(props.date),
                selected: false
            },
            {
                id: 1,
                date: 'Yesterday',
                subTitle: '',
                selected: false
            },
        ];
        this.state = {
            items: this.itemsList
        }
    }

    componentWillReceiveProps( nextProps ){
      console.log(nextProps)
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
            return <Card item={item} click={(e => this.handleCardClick(item.id, e))} key={item.id} initItems={this.props.initItems} date={item.date} subTitle={item.subTitle}/>
        })
    }

    addItem(item) {
        this.itemsList.push(item);
        this.setState({ items: this.itemsList });
    }

    render() {
        return (
            <Col id="date_list" className="align fit p-10 d-flex justify-content-between">
                {this.makeItems(this.state.items)}
            </Col>
        )
    }
}

export default Carousel;
