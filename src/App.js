import { useState } from 'react';
import './App.css';
import DuelistRadioSelection from './components/DuelistRadioSelection';
import DuelistReducer from './components/DuelistReducer';
import TopBar from './components/TopBar';


function App() {

  const [duelistName, setduelistName] = useState("");

  return (
    <div className="App">

      <TopBar />
      

      <main>
        <DuelistReducer className="reducer" duelistName={duelistName} />
        <DuelistRadioSelection selected={duelistName} setSelected={setduelistName} />
      </main>
    </div>
  );
}

export default App;
