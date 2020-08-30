import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ButtonToolbar, Icon, Button, Form } from 'rsuite';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
        this.placeholder = document.createElement("li");
        this.placeholder.className = "placeholder";
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
    dragStart(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.dragged);
    }
    dragEnd(e) {
        this.dragged.style.display = 'block';
        this.dragged.parentNode.removeChild(this.placeholder);

        // update state
        var data = this.state.items;
        var from = Number(this.dragged.dataset.id);
        var to = Number(this.over.dataset.id);
        if (from < to) to--;
        data.splice(to, 0, data.splice(from, 1)[0]);
        this.setState({ items: data });
    }
    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        if (e.target.className === 'placeholder') return;
        this.over = e.target;
        e.target.parentNode.insertBefore(this.placeholder, e.target);
        console.log(this.state.items);
    }
    render() {
        var items = this.state.items.map((item, i) => {
            var todoClass = item.done ?
                "done" : "undone";
            return (
                // <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
                <li className="p-2 list-group-item dark_theme overflow-auto li_todo"
                    data-id={i}
                    key={i}
                    draggable='true'
                    onDragEnd={this.dragEnd.bind(this)}
                    onDragStart={this.dragStart.bind(this)}
                >
                    <div className={todoClass}>
                        <Button appearance="subtle" aria-hidden="true" onClick={this.onClickDone}>
                            <Icon className="dark_theme_pop_text" icon="check" />
                        </Button>
                        {item}
                        <button type="button" className="close dark_theme_pop_text" onClick={this.onClickClose}>
                            &times;
                        </button>
                    </div>
                </li>
            );
        });
        return (
            <ul className="list-group ul_todo" onDragOver={this.dragOver.bind(this)}>
                {items}
            </ul>
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
            <li className="p-2 list-group-item dark_theme overflow-auto"
                draggable='true'
                onDragEnd={this.dragEnd.bind(this)}
                onDragStart={this.dragStart.bind(this)}
            >
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
                        <Button className="dark_theme_pop" type="submit">Add</Button>
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
        // this.todoItems.unshift({
        //     index: this.todoItems.length + 1,
        //     value: todoItem.newItemValue,
        //     done: false
        // });
        this.todoItems.push(todoItem.newItemValue);
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
                <TodoHeader title={this.title} />
                <TodoList items={this.todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
                <TodoForm addItem={this.addItem} />
            </Col>
        );
    }
}


export default TodoApp;