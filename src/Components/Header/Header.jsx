import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';


const Header = ({ addedItems, setSearchQuery, value }) => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">Shopping</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={value}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="outline-success" size='' style={{ width: "100%" }} >Added ({addedItems.length}) Item</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header