import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import MainContent from './Components/MainContent/MainContent';

function App() {
  const [addedItems, setAddedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <Header 
      addedItems={addedItems} 
      setSearchQuery={setSearchQuery} 
      value={searchQuery} 
      />
      <MainContent 
      addedItems={addedItems} 
      setAddedItems={setAddedItems} 
      searchQuery={searchQuery} 
      />
    </div>
  );
}

export default App;
