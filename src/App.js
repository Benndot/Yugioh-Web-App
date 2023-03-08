import { useState } from 'react';
import './App.css';
import DuelistRadioSelection from './components/DuelistRadioSelection';
import DuelistReducer from './components/DuelistReducer';


function App() {

  const [duelistName, setduelistName] = useState("");

  return (
    <div className="App">
      
      <header className='header-section'>
        <h1 className='header-title'>Yugioh State Simulator</h1>
      </header>

      <main>
        <DuelistReducer className="reducer" duelistName={duelistName} />
        <DuelistRadioSelection selected={duelistName} setSelected={setduelistName} />
      </main>
    </div>
  );
}

export default App;
