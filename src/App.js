import { useState } from 'react';
import './App.css';
import DuelistRadioSelection from './components/DuelistRadioSelection';
import DuelistReducer from './components/DuelistReducer';


function App() {

  const [duelistName, setduelistName] = useState("");

  return (
    <div className="App">
      <header>
        <h1>Yugioh State and Reducer App!</h1>
      </header>

      <main>
        <DuelistReducer className="reducer" duelistName={duelistName} />
        <DuelistRadioSelection selected={duelistName} setSelected={setduelistName} />
      </main>
    </div>
  );
}

export default App;
