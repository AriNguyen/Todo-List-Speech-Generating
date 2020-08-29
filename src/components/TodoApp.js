import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ButtonToolbar, Icon, Button, Form } from 'rsuite';

class TodoList extends React.Component {
    render() {
        var items = this.props.items.map((item, index) => {
            return (
                <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
            );
        });
        return (
            <ul className="list-group"> {items} </ul>
        );
    }
}

class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }
    onClickClose() {
        var index = parseInt(this.props.index);
        this.props.removeItem(index);
    }
    onClickDone() {
        var index = parseInt(this.props.index);
        this.props.markTodoDone(index);
    }
    render() {
        var todoClass = this.props.item.done ?
            "done" : "undone";
        return (
            <li className="p-2 list-group-item dark_theme overflow-auto">
                <div className={todoClass}>
                    <Button appearance="subtle" aria-hidden="true" onClick={this.onClickDone}>
                        <Icon className="dark_theme_pop_text" icon="check" />
                    </Button>
                    {/* <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span> */}
                    {this.props.item.value}
                    <button type="button" className="close dark_theme_pop_text" onClick={this.onClickClose}>&times;</button>
                </div>
            </li>
        );
    }
}

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.refs.itemName.focus();
    }
    onSubmit(event) {
        event.preventDefault();
        var newItemValue = this.refs.itemName.value;

        if (newItemValue) {
            this.props.addItem({ newItemValue });
            this.refs.form.reset();
        }
    }
    render() {
        return (
            <Container>
                <Row>
                    <form ref="form" onSubmit={this.onSubmit} className="form-inline">
                        <input type="text" ref="itemName" placeholder="add a new todo..." />
                        <Button type="submit">Add</Button>
                    </form>
                </Row>

            </Container>

        );
    }
}

class TodoHeader extends React.Component {
    constructor(props) {
        super(props);
        this.title = props.title;
    }
    render() {
        return <h4>{this.title}</h4>;
    }
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.markTodoDone = this.markTodoDone.bind(this);
        this.todoItems = props.initItems;
        this.state = { todoItems: this.todoItems };
        this.title = props.title;
    }
    addItem(todoItem) {
        this.todoItems.unshift({
            index: this.todoItems.length + 1,
            value: todoItem.newItemValue,
            done: false
        });
        this.setState({ todoItems: this.todoItems });
    }
    removeItem(itemIndex) {
        this.todoItems.splice(itemIndex, 1);
        this.setState({ todoItems: this.todoItems });
    }
    markTodoDone(itemIndex) {
        var todo = this.todoItems[itemIndex];
        this.todoItems.splice(itemIndex, 1);
        todo.done = !todo.done;
        todo.done ? this.todoItems.push(todo) : this.todoItems.unshift(todo);
        this.setState({ todoItems: this.todoItems });
    }
    render() {
        return (
            <Col>
                <TodoHeader title={this.title}/>
                <TodoList items={this.todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
                {/* <TodoForm addItem={this.addItem} /> */}
            </Col>
        );
    }
}


export default TodoApp;