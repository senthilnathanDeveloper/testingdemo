import React, { useEffect, useState } from 'react'
import { Button, Card, Col, FloatingLabel, Form, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import './style.css'

const Products = ({ items, itemQuantities, toggleAddedStatus }) => {
  const { productId } = useParams();
  const product = items.find(item => item.id === parseInt(productId));
  const [comments, setComments] = useState('');
  const [storedComments, setStoredComments] = useState([]);
  const [storedRatings, setStoredRatings] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();



  useEffect(() => {
    const storedCommentsString = localStorage.getItem(`comments-${productId}`);
    const storedRatingsString = localStorage.getItem(`ratings-${productId}`); // Retrieve stored ratings
    if (storedCommentsString) {
      const parsedComments = JSON.parse(storedCommentsString);
      setStoredComments(parsedComments);
    }
    if (storedRatingsString) {
      const parsedRatings = JSON.parse(storedRatingsString);
      setStoredRatings(parsedRatings);
    }
  }, [productId]);



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


  const handleCommentChange = event => {
    const value = event.target.value;
    setComments(value);
    setValue('comment', value);

  };

  const handleCommentSubmit = data => {
    if (userRating === 0) {

      return;
    }
    const newComments = [...storedComments, data.comment];
    const newRatings = [...storedRatings, userRating]; // Store userRating along with comments
    localStorage.setItem(`comments-${productId}`, JSON.stringify(newComments));
    localStorage.setItem(`ratings-${productId}`, JSON.stringify(newRatings));
    setStoredComments(newComments);
    setStoredRatings(newRatings);
    setComments('');
    setUserRating(0); // Clear the comment field after submission
  };



  const calculateOverallRating = () => {
    if (storedRatings.length === 0) {
      return 0;
    }
    const sumRatings = storedRatings.reduce((total, rating) => total + rating, 0);
    return sumRatings / storedRatings.length;
  };

  const overallRating = calculateOverallRating();

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

          {[1, 2, 3, 4, 5].map((_, starIndex) => (
            <span
              key={starIndex}
              className='star-icon'
              style={{
                color: starIndex < overallRating ? '#FFD700' : '#ccc',
              }}
            >
              <AiFillStar />
            </span>
          ))}

          <OverlayTrigger
            placement='auto'
            overlay={<Tooltip id={`tooltip-${overallRating}`}>Rating: {overallRating.toFixed(1)}</Tooltip>}
          >
            <span className='rating-value fs-5'>{`${overallRating.toFixed(1)} out of 5 `}</span>
          </OverlayTrigger>
          <hr />
          <ul>
            <li className='fs-6 product-description '>{product.description}</li>
          </ul>
          <hr />

          <div className='mt-5'>
            <form onSubmit={handleSubmit(handleCommentSubmit)}>
              <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }}
                  value={comments}
                  {...register('comment', {
                    required: 'Please enter a comment.',
                    minLength: { value: 5, message: 'Comment must be at least 5 characters.' },
                    // maxLength: { value: 100, message: 'Comment cannot exceed 100 characters.' },
                  })}
                  isInvalid={!!errors.comment}
                  onChange={handleCommentChange}

                />
                <Form.Control.Feedback type="invalid">
                  {errors.comment && errors.comment.message}
                </Form.Control.Feedback>
              </FloatingLabel>

              <div className='mt-3 d-flex gap-3'>
                <label className='form-label'>Your Rating:</label>
                <span>
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <span
                      key={starValue}
                      className='star-icon'
                      onClick={() => setUserRating(starValue)}
                      style={{
                        cursor: 'pointer',
                        color: starValue <= userRating ? '#FFD700' : '#ccc',
                      }}

                    >
                      {starValue <= userRating ? <AiFillStar /> : <AiOutlineStar />}
                    </span>
                  ))}
                </span>
                {errors.rating && (
                  <span className='text-danger'>Please select a rating.</span>
                )}
              </div>
              <Button className='mt-4 w-100 rounded-pill' type='submit'  >Submit</Button>
            </form>
          </div>
          <div className='mt-4'>
            <h4>Customer comments</h4>
            {storedComments.map((comment, index) => (
              <div key={index} className='d-flex align-items-center justify-content-between mt-3 '>
                <span>{comment}</span>
                {storedRatings[index] !== undefined && (
                  <div className='d-flex align-items-center ms-3'>
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className='star-icon'
                        style={{
                          color: starIndex < storedRatings[index] ? '#FFD700' : '#ccc',
                        }}
                      >
                        <AiFillStar />
                      </span>
                    ))}
                    <span className='rating-value fs-6'>
                      {`${storedRatings[index].toFixed(1)} out of 5 `}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>


        </Col>
        <Col lg='2' className='mt-4'>
          <Card className='p-4'>
            <span className='fs-4'>${product.price}</span>
            <span className='mt-3 product-description'>{product.category}</span>
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