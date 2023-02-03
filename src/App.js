import { useState } from 'react';
import './App.css';
import DuelistRadioSelection from './components/DuelistRadioSelection';
import DuelistReducer from './components/DuelistReducer';


function App() {

  const [duelistName, setduelistName] = useState("");

  return (
    <div className="App">
      <h1>This is my dedicated Yugioh Reducer App!</h1>
      <DuelistReducer duelistName={duelistName} />
      <DuelistRadioSelection selected={duelistName} setSelected={setduelistName} />
    </div>
  );
}

export default App;
