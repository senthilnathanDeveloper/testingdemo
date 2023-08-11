import React, { useState } from 'react'
import { Button, Card, Col, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import './style.css'

const Products = ({ items }) => {
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [comment, setComment] = useState('');
  const { productId } = useParams();
  const navigate = useNavigate()
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

  const handleText = () => {
    switch (number || hoverStar) {
      case 0:
        return "Evaluate";
      case 1:
        return "Dissatifation";
      case 2:
        return "Unsatisfied";
      case 3:
        return "Normal";
      case 4:
        return "Satisfied";
      case 5:
        return "Very Satisfied";
      default:
        return "Evaluate";
    }
  };

  const handleCommentChange = event => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Star Rating:', number);
    console.log('Comment:', comment);
    setNumber(0);
    setComment('');
    navigate('/')
  };
  return (
    <>
      <Row className='row m-0'>
        <Col lg='12' >
          <Card className='product-card mt-3'>
            <Card.Img variant='top' src={product.image} className='card-img-top p-3  mx-auto d-block singleproduct-image' />
            <Card.Text>
              <p className='card-text text-start'>
                <strong>{product.title}</strong>
              </p>
            </Card.Text>
            <Card.Body>
              <h1 className='d-flex align-items-center justify-content-center'>{handleText()}</h1>
              <div className='d-flex align-items-center justify-content-center' role='button'>
                {Array(5)
                  .fill()
                  .map((_, index) =>
                    number >= index + 1 || hoverStar >= index + 1 ? (
                      <AiFillStar
                        key={index}
                        onMouseOver={() => !number && setHoverStar(index + 1)}
                        onMouseLeave={() => setHoverStar(undefined)}
                        className='star-icon'
                        onClick={() => setNumber(index + 1)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={index}
                        onMouseOver={() => !number && setHoverStar(index + 1)}
                        onMouseLeave={() => setHoverStar(undefined)}
                        className='star-icon'
                        onClick={() => setNumber(index + 1)}
                      />
                    )
                  )}

              </div>
              <Row className='mt-3'>
                <Col lg="12">
                  <FloatingLabel controlId="floatingTextarea2" label="Comments">
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      className='w-100'
                      value={comment}
                      onChange={handleCommentChange}
                    />
                  </FloatingLabel>
                  <Button className='mt-3 w-100' variant="primary" onClick={handleSubmit}>Submit</Button>
                </Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Products