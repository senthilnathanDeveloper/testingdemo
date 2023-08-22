import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './style.css';

const ImageModal = ({ show, handleClose, imageSrc,product }) => {
    const [zoomedIn, setZoomedIn] = useState(false);

    const handleImageClick = () => {
        setZoomedIn(!zoomedIn);
    };

    useEffect(() => {
        if (!show) {
            setZoomedIn(false);
        }
    }, [show]);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">{product.category}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={`image-container ${zoomedIn ? 'zoomed-in' : ''}`}>
                        <img
                            src={imageSrc}
                            className="zoomable-image"
                            alt="Zoomed In"
                            onClick={handleImageClick}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ImageModal;