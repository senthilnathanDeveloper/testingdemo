import React, { useEffect, useState } from 'react'
import { Button, Card, Col, FloatingLabel, Form, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import './style.css'
import ImageModal from './ImageModal';
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const Products = ({ items, itemQuantities, toggleAddedStatus, }) => {
  const { productId } = useParams();
  const product = items.find(item => item.id === parseInt(productId));
  const [comments, setComments] = useState('');
  const [storedComments, setStoredComments] = useState([]);
  const [storedRatings, setStoredRatings] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [zoomedImageSrc, setZoomedImageSrc] = useState('');
  const [expandedComments, setExpandedComments] = useState([]);
  const [visibleCommentCount, setVisibleCommentCount] = useState(5);


  const handleImageClick = () => {
    setZoomedImageSrc(product.image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setZoomedImageSrc('');
  };


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
    const currentDate = new Date();
    const newComment = {
      user: "Anonymous User", // Placeholder for anonymous user
      comment: data.comment,
      rating: userRating,
      date: currentDate.toISOString()
    };
    const newComments = [...storedComments, newComment];
    const newRatings = [...storedRatings, userRating];
    localStorage.setItem(`comments-${productId}`, JSON.stringify(newComments));
    localStorage.setItem(`ratings-${productId}`, JSON.stringify(newRatings));
    setStoredComments(newComments);
    setStoredRatings(newRatings);
    setComments('')
    setUserRating(0);
  };



  const calculateOverallRating = () => {
    if (storedRatings.length === 0) {
      return 0;
    }
    const sumRatings = storedRatings.reduce((total, rating) => total + rating, 0);
    return sumRatings / storedRatings.length;
  };

  const overallRating = calculateOverallRating();


  const handleExpandComment = (index) => {
    console.log("index", index)
    setExpandedComments((prevExpanded) => [...prevExpanded, index]);
  };

  const handleCollapseComment = (index) => {
    setExpandedComments((prevExpanded) => prevExpanded.filter((item) => item !== index));
  };



  const handleSeeMoreReviews = () => {
    setVisibleCommentCount((prevCount) => prevCount + 5);
  };



  return (
    <>
      <Row className='row m-0'>
        <Col lg='3' className='mt-3' >
          <div className='image-container' role='button'>
            <img src={product.image} onClick={handleImageClick} className='w-100 h-auto' alt='' />
          </div>
        </Col>
        <Col lg='6' className='mt-4'>
          <div> <h3>{product.title}</h3></div>



          {storedRatings.length > 0 && [1, 2, 3, 4, 5].map((_, starIndex) => (
            <span
              key={starIndex}
              className={`${starIndex < overallRating ? "starfill-icon" : "staroutline-icon"}`}
            >
              <AiFillStar />
            </span>
          ))}

          {storedRatings.length > 0 && (
            <OverlayTrigger
              placement='auto'
              overlay={<Tooltip id={`tooltip-${overallRating}`}>Rating: {overallRating.toFixed(1)}</Tooltip>}
            >
              <span className='rating-value fs-5'>{`${overallRating.toFixed(1)} out of 5 `}</span>
            </OverlayTrigger>
          )}



          <hr />
          <ul>
            <li className='fs-6 product-description '>{product.description}</li>
          </ul>
          <hr />

          <div className='mt-3'>
            <form onSubmit={handleSubmit(handleCommentSubmit)}>
              <div>
                <h4>Add a review</h4>
              </div>
              <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                  as="textarea"
                  className='h-100'
                  placeholder="Leave a comment here"
                  value={comments}
                  {...register('comment', {
                    required: 'Please enter a comment.',
                    minLength: { value: 5, message: 'Comment must be at least 5 characters.' },
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
                      role='button'
                      key={starValue}
                      className={`${starValue <= userRating ? "starfill-icon" : "staroutline-icon"}`}
                      onClick={() => setUserRating(starValue)}
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
            <h4>Customer Reviews</h4>
            {storedComments.slice(0, visibleCommentCount).map((comment, index) => (
              <div key={index} className='d-flex flex-column mt-3'>
                <div className='d-flex justify-content-between'>
                  <span className='user-comment'>{comment.user}</span>
                  {comment.rating !== undefined && (
                    <div className='d-flex align-items-center'>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span
                          key={starIndex}
                          className={`${starIndex < comment.rating ? "starfill-icon" : "staroutline-icon"}`}
                        >
                          <AiFillStar />
                        </span>
                      ))}
                      <span className='rating-value fs-6'>
                        {`${comment.rating.toFixed(1)} out of 5 `}
                      </span>
                    </div>
                  )}
                </div>
                <span className='text-muted user-comment'>
                  {`${new Date(comment.date).getDate()} ${monthNames[new Date(comment.date).getMonth()]} ${new Date(comment.date).getFullYear()}`}
                </span>
                {comment.comment.length > 100 && !expandedComments.includes(index) ? (
                  <>
                    <span> {`${comment.comment.charAt(0).toUpperCase() + comment.comment.slice(1, 100)}...`}</span>
                    <span onClick={() => handleExpandComment(index)} role='button' className='expand'>Show More</span>
                  </>
                ) : (
                  <>
                    <span>{comment.comment.charAt(0).toUpperCase() + comment.comment.slice(1)}</span>
                    {comment.comment.length > 100 && (
                      <span onClick={() => handleCollapseComment(index)} role='button' className='expand'>Show Less</span>
                    )}
                  </>
                )}
              </div>
            ))}
            <hr />
            {visibleCommentCount < storedComments.length && (
              <>
                <span onClick={handleSeeMoreReviews} role='button' className='expand-more'>See More Reviews</span>
              </>
            )}
            {storedComments.length > 0 && (
              <p>Total Reviews: {storedComments.length}</p>
            )}

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
      <ImageModal
        show={showModal}
        handleClose={handleCloseModal}
        imageSrc={zoomedImageSrc}
        product={product}
      />
    </>
  )
}

export default Products