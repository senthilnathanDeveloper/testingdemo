import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import './style.css'

const AddedItems = ({ addedItems, showOffCanvas, handleClose, selectedItems, handleDelete }) => {

    const handleProductDelete = (itemId) => {
        handleDelete(itemId);
    };

    return (
        <>
            <Offcanvas placement='end' show={showOffCanvas} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Added {addedItems.length} Items</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div id="print-section">
                        {selectedItems.length > 0 ? (
                            selectedItems.map((item) => (
                                <div key={item.id} className='mt-5'>
                                    <div className='d-flex align-items-center justify-content-between'>

                                        <img src={item.image} style={{ width: "10%" }} className='product-image' alt='' />
                                        <span className='cancel' onClick={() => handleProductDelete(item.id)}  >X</span>
                                    </div>
                                    <h6 className='mt-3'>{item.title}</h6>

                                    <p>Price: {item.price}</p>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p className="d-flex align-items-center justify-content-center h-100">No item selected</p>
                        )}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default AddedItems