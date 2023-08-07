import React, { useEffect, useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import './style.css'

const AddedItems = ({ addedItems, showOffCanvas, handleClose, selectedItems, handleDelete, handleIncrementQuantity, itemQuantities, handleDecrementQuantity }) => {

    const handleProductDelete = (itemId) => {
        handleDelete(itemId);
    };
    const [totalAmount, setTotalAmount] = useState(0); // Initialize the totalAmount state

    useEffect(() => {
        // Calculate total amount whenever selectedItems or itemQuantities change
        const newTotalAmount = selectedItems.reduce((total, item) => {
            const quantity = itemQuantities[item.id] || 1;
            return total + item.price * quantity;
        }, 0);

        setTotalAmount(newTotalAmount);
    }, [selectedItems, itemQuantities]);

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
          <html>
          <head>
            <title>Print</title>
            <style>
              @media print {
                .no-print {
                  display: none;
                }
                body {
                  font-family: Arial, sans-serif;
                }
                .print-content {
                  padding: 20px;
                }
              }
            </style>
          </head>
          <body>
            <div class="print-content">
              ${selectedItems
                .map(
                    (item) => `
                  <div>
                  <img src="${item.image}" alt="${item.title}" style="max-width: 100px;">
                  <h3>${item.title}</h3>
                  <p>Price: $${item.price.toFixed(2)}</p>
                  <p>Quantity: ${itemQuantities[item.id] || 1}</p>
                  <hr>
                </div>
              `
                )
                .join('')}
            <div class="total-amount">Total Amount: $${totalAmount.toFixed(2)}</div>
          </div>
        </body>
        </html>
      `);
        printWindow.document.close();
        printWindow.print();
    };

    const isAnyItemSelected = selectedItems.length > 0;

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
                                    <div className='d-flex align-items-center justify-content-end gap-3'>
                                        <span className='add' onClick={() => handleIncrementQuantity(item.id)}>+</span>
                                        <span>{itemQuantities[item.id] || 1}</span>
                                        <span className='clear' onClick={() => handleDecrementQuantity(item.id)}>-</span>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p className="d-flex align-items-center justify-content-center h-100">No item selected</p>
                        )}
                    </div>

                    {isAnyItemSelected && (
                        <>
                            <div className='mt-5'>Total Amount: {totalAmount.toFixed(2)}</div>

                            <div className='mt-5'>
                                <Button variant='info w-100' onClick={handlePrint}>
                                    Print
                                </Button>
                            </div>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default AddedItems