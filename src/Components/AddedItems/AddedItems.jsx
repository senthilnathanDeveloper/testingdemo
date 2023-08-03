import React from 'react'
import { Offcanvas } from 'react-bootstrap'

const AddedItems = ({ addedItems, showOffCanvas, handleClose, selectedItem }) => {
    console.log("selectedItem0", selectedItem)
    return (
        <>
            <Offcanvas placement='end' show={showOffCanvas} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Added {addedItems.length} Items</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {selectedItem ? (
                        <div>
                            <h3>{selectedItem.title}</h3>
                            <p>{selectedItem.description}</p>
                            <p>Price: {selectedItem.price}</p>
                        </div>
                    ) : (
                        <p className='d-flex align-items-center justify-content-center h-100'>No item selected</p>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default AddedItems