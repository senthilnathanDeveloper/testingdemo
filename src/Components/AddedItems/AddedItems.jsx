import React, { useEffect, useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import './style.css'

const AddedItems = ({ addedItems, showOffCanvas, handleClose, selectedItems, handleDelete, handleIncrementQuantity, itemQuantities, handleDecrementQuantity, setItemQuantities }) => {

  const handleProductDelete = (itemId) => {
    handleDelete(itemId);
    setItemQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[itemId];
      return updatedQuantities;
    });
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

  const uniqueSelectedItems = selectedItems.filter((item, index, self) =>
    index === self.findIndex((i) => i.id === item.id)
  );

  return (
    <>
      <Offcanvas placement='end' show={showOffCanvas} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Added {addedItems.length} Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div id="print-section">
            {uniqueSelectedItems.length > 0 ? (
              uniqueSelectedItems.map((item) => {
                return (
                  <>
                    <div key={item.id} className='mt-5'>
                      <div className='d-flex align-items-center justify-content-between'>

                        <img src={item.image} className='product-image' alt='' role='button' />

                        <svg xmlns="http://www.w3.org/2000/svg" role='button' onClick={() => handleProductDelete(item.id)} width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </div>
                      <h6 className='mt-3'>{item.title}</h6>

                      <p>Price: {item.price}</p>
                      <div className='d-flex align-items-center justify-content-end gap-3'>
                        <span role='button' className='add p-1 rounded-1 d-flex align-items-center justify-content-center' onClick={() => handleIncrementQuantity(item.id)}>+</span>
                        <span>{itemQuantities[item.id] || 1}</span>
                        <span role='button' className='clear p-1 rounded-1 d-flex align-items-center justify-content-center' onClick={() => handleDecrementQuantity(item.id)}>-</span>
                      </div>
                      <hr />
                    </div>
                  </>
                )
              })
            ) : (
              <p className="d-flex align-items-center justify-content-center h-100">No item selected</p>
            )}
          </div>

          {isAnyItemSelected && (
            <>
              <div className='mt-5'>Total Amount: {totalAmount.toFixed(2)}</div>

              <div className='mt-5'>
                <button variant='info w-100' className='printbutton fs-5 w-100 rounded-pill border border-1 border-dark ' onClick={handlePrint}>
                  Print
                </button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default AddedItems