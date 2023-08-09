import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import './style.css'

const MainContent = ({ addedItems, searchQuery, toggleAddedStatus, items, itemQuantities }) => {
    const [showLessMap, setShowLessMap] = useState({});




    const filteredItems = items.filter(
        (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );




    const changeShow = (itemId) => {
        setShowLessMap((prevMap) => ({
            ...prevMap,
            [itemId]: !prevMap[itemId],
        }));
    };

    return (
        <>
            <Row className='row d-flex m-0'>
                {filteredItems.map((item, index) => {
                    const itemId = item.id;
                    const showLess = showLessMap[itemId];
                    return (
                        <>
                            <Col key={index} lg='4' md='6' className='mt-5'>
                                <Card className='h-100 p-3'>
                                    <Card.Img variant='top' src={item.image} className='card-img-top w-50 p-3  mx-auto d-block' />
                                    <Card.Body className='flex-fill'>
                                        <Card.Title className="text-decoration-underline card-title h5 text-start">{item.category}</Card.Title>
                                        <Card.Text>
                                            <p className='card-text text-start'>
                                                <strong >{item.title}</strong>
                                            </p>
                                        </Card.Text>
                                        <p className='card-text text-start' onClick={() => changeShow(itemId)}>
                                            {showLess ? item.description.slice(0, 100) : item.description}
                                            <span className='position-relative ms-3 text-color fw-bold' role='button'> {showLess ? "Show more" : "Show Less"}</span>
                                        </p>
                                        <div className='row'>
                                            <div className='col-lg-12 d-flex align-items-center justify-content-between'>
                                                <span>Price: {item.price}</span>
                                                <button

                                                    onClick={() => toggleAddedStatus(item.id)} // Toggle the added status on button click
                                                    className='addToCartBttn rounded-pill mw-100 px-2 py-2 border border-1 border-dark'
                                                >
                                                    Add to cart {itemQuantities[item.id] > 0 && ` (${itemQuantities[item.id]})`}
                                                </button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    )
                })}
            </Row>
        </>
    )
}

export default MainContent