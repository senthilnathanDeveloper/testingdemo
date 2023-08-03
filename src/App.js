import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import MainContent from './Components/MainContent/MainContent';

function App() {
  const [addedItems, setAddedItems] = useState([]);
  
  return (
    <div className="App">
      <Header addedItems={addedItems} />
      <MainContent addedItems={addedItems} setAddedItems={setAddedItems} />
    </div>
  );
}

export default App;
