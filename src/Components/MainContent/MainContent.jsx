import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import './style.css'

const MainContent = ({ addedItems, searchQuery, toggleAddedStatus, items, itemQuantities }) => {

    const [heartStatus, setHeartStatus] = useState({});


    const filteredItems = items.filter(
        (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    useEffect(() => {
        const storedHeartStatus = JSON.parse(localStorage.getItem('heartStatus')) || {};
        setHeartStatus(storedHeartStatus);
    }, []);

    return (
        <>
            <Row className='row d-flex m-0'>
                {filteredItems.map((item, index) => {

                    return (
                        <>

                            <Col key={item.id} lg='4' md='6' className='mt-5'>
                                <Card className='h-100 p-3 content-card'>
                                    <div className='d-flex align-items-center justify-content-end' role='button'>
                                        {heartStatus[item.id] ? (
                                            <AiFillHeart
                                                className={`heart-icon d-flex align-items-center justify-content-end filled true`}
                                                onClick={() => {
                                                    const updatedHeartStatus = { ...heartStatus };
                                                    updatedHeartStatus[item.id] = !heartStatus[item.id];
                                                    setHeartStatus(updatedHeartStatus);
                                                    localStorage.setItem('heartStatus', JSON.stringify(updatedHeartStatus));
                                                }}
                                            />
                                        ) : (
                                            <AiOutlineHeart
                                                className={`heart-icon d-flex align-items-center justify-content-end outlined`}
                                                onClick={() => {
                                                    const updatedHeartStatus = { ...heartStatus };
                                                    updatedHeartStatus[item.id] = !heartStatus[item.id];
                                                    setHeartStatus(updatedHeartStatus);
                                                    localStorage.setItem('heartStatus', JSON.stringify(updatedHeartStatus));
                                                }}
                                            />
                                        )}
                                    </div>
                                    <Card.Img variant='top' src={item.image} className='card-img-top w-50 p-3  mx-auto d-block' />
                                    <Card.Body className='flex-fill'>
                                        <Link to={`/products/${item.id}`}>
                                            <Card.Title className="text-decoration-underline card-title h5 text-start text-dark">{item.category}</Card.Title>
                                        </Link>
                                        <Card.Text>
                                            <p className='card-text text-start'>
                                                <strong >{item.title}</strong>
                                            </p>
                                        </Card.Text>
                                        <p className='card-text text-start'>
                                            {item.description}
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