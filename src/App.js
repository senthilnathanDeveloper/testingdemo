import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import MainContent from './Components/MainContent/MainContent';
import AddedItems from './Components/AddedItems/AddedItems';

function App() {
  const [addedItems, setAddedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const handleClose = () => setShowOffCanvas(false);
  const handleShow = () => setShowOffCanvas(true);


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
      />

      <AddedItems
        addedItems={addedItems}
        showOffCanvas={showOffCanvas}
        handleClose={handleClose}
        selectedItem={selectedItem} 
      />
    </div>
  );
}

export default App;
