import React from 'react'
import { Button, Card, Col, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import './style.css'

const Products = ({ items, itemQuantities, toggleAddedStatus }) => {
  const { productId } = useParams();
  const product = items.find(item => item.id === parseInt(productId));




  if (!product) {
    return (
      <>
        <div className='d-flex align-items-center justify-content-center vh-100'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </>
    )
  }

  const apiRating = product.rating.rate;


  return (
    <>
      <Row className='row m-0'>
        <Col lg='3' className='mt-3' >
          <div className='image-container'>
            <img src={product.image} className='w-100 h-auto' alt='' />
          </div>
        </Col>
        <Col lg='6' className='mt-4'>
          <div> <h3>{product.title}</h3></div>
          {Array.from({ length: 5 }).map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={starValue}
                className='star-icon'
                style={{
                  color: starValue <= apiRating ? '#FFD700' : '#ccc',
                  width: starValue <= apiRating ? '100%' : '0',
                }}
              >
                <AiFillStar />
              </span>
            );
          })}

          <OverlayTrigger
            placement='auto'
            overlay={<Tooltip id={`tooltip-${apiRating}`}>Rating: {apiRating.toFixed(1)}</Tooltip>}
          >
            <span className='rating-value fs-5'>{`${apiRating.toFixed(1)} out of 5 `}</span>
          </OverlayTrigger>
          <hr />
          <ul>
            <li className='fs-6 product-description '>{product.description}</li>
          </ul>
        </Col>
        <Col lg='2' className='mt-4'>
          <Card className='p-4'>
            <span className='fs-4'>${product.price}</span>
            <Button className='addToCartBttn rounded-pill mw-100 px-2 py-2 border border-1 border-dark mt-4' onClick={() => toggleAddedStatus(product.id)}>
              Add to cart {itemQuantities[product.id] > 0 && `(${itemQuantities[product.id]})`}
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Products