import React from 'react'
import { Container, Form, ListGroup, Nav, Navbar } from 'react-bootstrap';
import './style.css'
import { Link } from 'react-router-dom';


const Header = ({ addedItems, setSearchQuery, value, handleShow, searchResults }) => {

    const handleSearchLinkClick = () => {
        setSearchQuery('');
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary header-section">
                <Container fluid>
                    <Navbar.Brand>Shopping</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 mh-100"
                            navbarScroll
                        >
                        </Nav>
                        <Form className="d-flex position-relative search-container">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={value}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {value && (
                                <ListGroup className="search-results list-group position-absolute">
                                    {searchResults.length > 0 ? (
                                        searchResults.map(result => (
                                            <Link to={`/products/${result.id}`} onClick={handleSearchLinkClick} className='text-decoration-none'>
                                                <ListGroup.Item key={result.id} className="d-flex align-items-center p-4 search-result-item list-group-item" role='button'>
                                                    <div className="d-flex align-items-center">
                                                        <img src={result.image} alt={result.title} className="me-3" />
                                                        <span className="fs-6 d-flex align-items-center">{result.category || result.title}</span>
                                                    </div>
                                                </ListGroup.Item>
                                            </Link>
                                        ))
                                    ) : (
                                        <ListGroup.Item className='d-flex align-items-center justify-content-center'>No data available</ListGroup.Item>
                                    )}
                                </ListGroup>
                            )}


                            <svg xmlns="http://www.w3.org/2000/svg" role='button' width="30" height="30" fill="currentColor" className="bi bi-cart-check" viewBox="0 0 16 16" onClick={handleShow}>
                                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>

                            <span className='addedlength d-flex align-items-center justify-content-center'>{addedItems.length > 0 && addedItems.length}</span>

                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header