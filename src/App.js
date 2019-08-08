import React, {useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import View from './calculation/calculateView'
import Body from './calculation/calculateBody'
import { StoreContext } from 'redux-react-hook';
import store from './store/index'

function App() {

  const [result, setResult] = useState('0');
  const [calculateDone, setCalculateDone] = useState(false);
  const [calculating, setCalculating] = useState([]);

  return (
    <StoreContext.Provider value={store}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <View result={result} calculating={calculating}
          />
          <Body
            calculateDone={calculateDone} setCalculateDone={setCalculateDone}
            result={result} setResult={setResult}
          />
        </div>
      </header>
    </div>
    </StoreContext.Provider>
  );
}

export default App;
