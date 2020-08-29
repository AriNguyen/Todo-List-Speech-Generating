import React from 'react';
import { Sidenav, Sidebar, Icon, Dropdown, Nav } from 'rsuite';

const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34c3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
};


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            activeKey: '1',
            backgroundColor: props.backgroundColor,
            color: props.color
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleToggle() {
        this.setState({
            expanded: !this.state.expanded
        });
    }
    handleSelect(eventKey) {
        this.setState({
            activeKey: eventKey
        });
    }
    handleSignOut = e => {
      e.preventDefault();
      window.localStorage.removeItem("token");
      window.location.href = `/`;
    }
    render() {
        const { expanded } = this.state;
        let new_style = {backgroundColor: this.state.backgroundColor, color: this.state.color};
        
        return (
            <Sidebar
                style={{ display: 'flex', flexDirection: 'column' }}
                width={expanded ? 260 : 56}
                collapsible
            >
                <Sidenav.Header>
                    <div style={headerStyles} className="dark_theme_pop_text">
                        <Icon icon="avatar" size="lg" style={{ verticalAlign: 0 }} />
                        <span style={{ marginLeft: 12 }}> NAME</span>
                    </div>
                </Sidenav.Header>

                <Sidenav
                    expanded={expanded}
                    defaultOpenKeys={['3']}
                    appearance="subtle"
                    style={new_style}
                    className="full_length"
                >
                    <Sidenav.Body>
                        <Nav>
                            {/* DashBoard */}
                            <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />} to="/dashboard">Dashboard</Nav.Item>

                            {/* My List */}
                            <Nav.Item eventKey="2" icon={<Icon icon="list" />}>My List</Nav.Item>

                            {/* My Calendar */}
                            <Nav.Item eventKey="3" icon={<Icon icon="calendar" />}>My Calendar</Nav.Item>

                            {/* Settings */}
                            <Dropdown placement="rightStart" eventKey="4" title="Settings" icon={<Icon icon="gear-circle" />}>
                                <Dropdown.Item eventKey="4-1">Account</Dropdown.Item>
                                <Dropdown.Item eventKey="4-2">Customization</Dropdown.Item>
                                <Dropdown.Item eventKey="4-3" onClick={this.handleSignOut}>Sign Out</Dropdown.Item>
                            </Dropdown>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </Sidebar>
        );
    }
}

export default SideBar;
