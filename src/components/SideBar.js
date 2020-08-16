import React from 'react';
import { Sidenav, Sidebar, Icon, Dropdown, Nav, Navbar } from 'rsuite';

const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34c3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
};

const iconStyles = {
    width: 56,
    height: 56,
    lineHeight: '56px',
    textAlign: 'center'
};

const NavToggle = ({ expand, onChange }) => {
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            <Navbar.Body>
                <Nav>
                    <Dropdown
                        placement="topStart"
                        trigger="click"
                        renderTitle={children => {
                            return <Icon style={iconStyles} icon="cog" />;
                        }}
                    >
                        <Dropdown.Item>Help</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                </Nav>

                <Nav pullRight>
                    <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                        <Icon icon={expand ? 'angle-left' : 'angle-right'} />
                    </Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
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
    render() {
        const { expanded } = this.state;
        let new_style = {backgroundColor: this.state.backgroundColor, color: this.state.color};
        console.log(new_style);
        return (
            <Sidebar
                style={{ display: 'flex', flexDirection: 'column' }}
                width={expanded ? 260 : 56}
                collapsible
            >
                <Sidenav.Header>
                    <div style={headerStyles}>
                        <Icon icon="avatar" size="lg" style={{ verticalAlign: 0 }} />
                        <span style={{ marginLeft: 12 }}> NAME</span>
                    </div>
                </Sidenav.Header>

                <Sidenav
                    expanded={expanded}
                    defaultOpenKeys={['3']}
                    appearance="subtle"
                    style={new_style}
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
                                <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                                <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
                                <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
                                <Dropdown.Menu eventKey="4-5" title="Custom Action">
                                    <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                                    <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </Sidebar>
        );
    }
}

export default SideBar;