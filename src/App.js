import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import MainContent from './Components/MainContent/MainContent';
import AddedItems from './Components/AddedItems/AddedItems';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './Components/Products/Products';

function App() {
  const [addedItems, setAddedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});



  const handleClose = () => {
    setShowOffCanvas(false);
  }

  const handleShow = () => {
    setShowOffCanvas(true);

  }

  const toggleAddedStatus = (itemId) => {
    const itemIndex = addedItems.indexOf(itemId);

    if (itemIndex !== -1) {
      // Item is already in the cart, increase the quantity
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: (prevQuantities[itemId] || 0) + 1,
      }));
    } else {
      // Item is not in the cart, add it with quantity 1
      setAddedItems([...addedItems, itemId]);
      const selectedItem = items.find((item) => item.id === itemId);
      setSelectedItem(selectedItem);

      // Check if the item is not already in itemQuantities, then initialize it to 1
      if (!itemQuantities[itemId]) {
        setItemQuantities((prevQuantities) => ({
          ...prevQuantities,
          [itemId]: 1,
        }));
      }

      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  const handleDelete = (itemId) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
    setAddedItems(addedItems.filter((id) => id !== itemId));
  };

  const handleIncrementQuantity = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const handleDecrementQuantity = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max((prevQuantities[itemId] || 1) - 1, 1),
    }));
  };

  const handleAddToCart = (product) => {
    setSelectedItems((prevSelectedItems) => [...prevSelectedItems, product]);
  };


  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);
  const searchResults = items.filter(item => item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||item.title.toLowerCase().includes(searchQuery.toLowerCase()) );

  return (
    <Router>
      <div className="App">
        <Header
          addedItems={addedItems}
          setSearchQuery={setSearchQuery}
          value={searchQuery}
          handleShow={handleShow}
          searchResults={searchResults}
        />
        <Routes>
          <Route path="/" element={<MainContent
            addedItems={addedItems}
            setAddedItems={setAddedItems}
            searchQuery={searchQuery}
            setSelectedItem={setSelectedItem}
            toggleAddedStatus={toggleAddedStatus}
            items={items}
            itemQuantities={itemQuantities}
          />} />
          <Route path="/products/:productId" element={<Products items={items}
            itemQuantities={itemQuantities}
            handleAddToCart={handleAddToCart}
            selectedItems={selectedItems}
            handleIncrementQuantity={handleIncrementQuantity}
            addedItems={addedItems}
            setAddedItems={setAddedItems}
            setItemQuantities={setItemQuantities}
            toggleAddedStatus={toggleAddedStatus}
          />} />
        </Routes>
        <AddedItems
          addedItems={addedItems}
          showOffCanvas={showOffCanvas}
          handleClose={handleClose}
          selectedItem={selectedItem}
          selectedItems={selectedItems}
          handleDelete={handleDelete}
          handleIncrementQuantity={handleIncrementQuantity}
          handleDecrementQuantity={handleDecrementQuantity}
          itemQuantities={itemQuantities}
          setItemQuantities={setItemQuantities}
        />
      </div>
    </Router>
  );
}

export default App;
