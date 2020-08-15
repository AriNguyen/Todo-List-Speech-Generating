import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {

    return (
        <footer className='mt-5'>
            <Container fluid={true}>
                <Row className="justify-content-between p-3">
                    {/* <Col className="p-0" md={3} sm={12}>
                        Todo List
                    </Col>
                    <Col className="p-0 d-flex justify-content-end" md={3}>
                        A website to generates todo-list dashboard with speech generating
                    </Col> */}
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;