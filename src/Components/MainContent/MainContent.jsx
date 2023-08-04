import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import './style.css'

const MainContent = ({ addedItems, searchQuery, toggleAddedStatus, items }) => {


    const filteredItems = items.filter(
        (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>
            <Row className='row d-flex m-0'>
                {filteredItems.map((item, index) => (
                    <Col key={index} lg='4' className='mt-5'>
                        <Card style={{ width: '100%' }} className='h-100'>
                            <Card.Img variant='top' src={item.image} style={{ width: '30%' }} />
                            <Card.Body className='flex-fill'>
                                <Card.Title className='text-decoration-underline'>{item.category}</Card.Title>
                                <Card.Text>
                                    <strong>{item.title}</strong>
                                </Card.Text>
                                <p>{item.description}</p>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex align-items-center justify-content-between'>
                                        <span>Price: {item.price}</span>
                                        <Button
                                            variant={addedItems.includes(item.id) ? 'danger' : 'primary'}
                                            onClick={() => toggleAddedStatus(item.id)} // Toggle the added status on button click
                                        >
                                            {addedItems.includes(item.id) ? 'CANCEL' : 'ADD'}
                                        </Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default MainContent