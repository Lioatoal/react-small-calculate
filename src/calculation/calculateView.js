import React, {useState, useEffect} from 'react'
import {Input} from 'antd'
import 'antd/dist/antd.css';
import './calculate.scss'
import { useMappedState } from 'redux-react-hook'

const View = (props) => {
  const [path, setPath] = useState('');
  const {result} = props;

  const calculation = useMappedState(state => state.calculation)
  
  useEffect(() => {
    let newPath = '';
    for (let i = 0; i < calculation.length; i++) {
      switch(calculation[i]){
        case "add":
          newPath += '+';
          continue;
        case "minus":
          newPath += '-';
          continue;
        case "mul":
          newPath += '*';
          continue;
        case "div":
          newPath += '/';
          continue;
        default:
          newPath += calculation[i];
          break;
      }
    }
    setPath(newPath);
  });
  
  return (
    <div>
      <div className="dataView">
        <Input 
          disabled
          value={result}
        />
      </div>
      <input className="history"
        disabled
        value={path}
      />
    </div>
  )
}

export default View