import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import MainContent from './Components/MainContent/MainContent';
import AddedItems from './Components/AddedItems/AddedItems';

function App() {
  const [addedItems, setAddedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});



  const handleClose = () => setShowOffCanvas(false);
  const handleShow = () => setShowOffCanvas(true);

  const toggleAddedStatus = (itemId) => {
    if (addedItems.includes(itemId)) {
      setAddedItems(addedItems.filter((id) => id !== itemId));
      setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
    } else {
      setAddedItems([...addedItems, itemId]);
      const selectedItem = items.find((item) => item.id === itemId);
      setSelectedItem(selectedItem);
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
      [itemId]: Math.max((prevQuantities[itemId] || 0) - 1, 0),
    }));
  };



  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);


  return (
    <div className="App">
      <Header
        addedItems={addedItems}
        setSearchQuery={setSearchQuery}
        value={searchQuery}
        handleShow={handleShow}
      />
      <MainContent
        addedItems={addedItems}
        setAddedItems={setAddedItems}
        searchQuery={searchQuery}
        setSelectedItem={setSelectedItem}
        toggleAddedStatus={toggleAddedStatus}
        items={items}
      />

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
      />
    </div>
  );
}

export default App;
