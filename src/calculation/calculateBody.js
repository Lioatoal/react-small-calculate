import React from 'react'
import { useMappedState} from 'redux-react-hook'
import {Icon, Button} from 'antd'
import 'antd/dist/antd.css';
import './calculate.scss'
import {addCalculating, updateCalculating, updateLastCalculating} from '../store/action'

let number = '';

const Body = (props) => {
  const {result, setResult, calculateDone, setCalculateDone, } = props;
  const calculation = useMappedState(state => state.calculation)

  //處理非運算子數據 (%, +/-, dot, ...)
  function numberProcess(action, done, num){
    let res = '';
    switch(action){
      case "dot":        
        (done || num === '') ? res = `0.` : (num.indexOf('.') === -1)? res = `${num}.` : res = num
        break;
      case "rem":
        res = `${parseFloat(num)/100}`
        break;
      case "rev":
        (parseFloat(num) > 0) ? res = `-${num}` : res = num.substring(1, num.length);
        break;
      case "sqrt":
        res = `${Math.sqrt(parseFloat(num))}`
        break;
      case "reciprocal":
        res = `${1/parseFloat(num)}`
        break;
      case "square":
        res = `${Math.pow(parseFloat(num), 2)}`
        break;
      case "cube":
        res = `${Math.pow(parseFloat(num), 3)}`
        break;
      default:
    }

    return res;
  }

  const numberHandler = (value) =>{
    if(calculateDone){
      number = '';
      setCalculateDone(false);
      updateCalculating([]);

      if(result !== 0 && typeof(value) === "string"){
        number = numberProcess(value, true, result);

        if(number){
          setResult(number);
          return;
        }
        updateCalculating([result.toString(), value]);
        return;
      }
    }

    if(typeof(value) === "number" ){
      number += `${value}`
      setResult(number);

      if(number === '0'){
        number = '';
      }
    } else if (typeof(value) === "string"){
      let res = numberProcess(value, false, number);

      if(res){
        number = res;
        setResult(number);
        return;
      }

      //判斷重複按壓運算子
      let max = calculation.length -1;
      console.log(calculation);
      if(max > 0 && isNaN(parseFloat(calculation[max])) && number === ''){
        let newCalculation = calculation;
        newCalculation[max] = value
        updateCalculating(newCalculation);
        return;
      }

      //預先運算結果
      let data = 0;
      let array = calculation.concat(result);
      for (let i = 0; i < array.length; i++) {
        if(typeof(array[i] === "string")){
          switch(array[i]){
            case "add":
              data += parseFloat(array[++i]);
              continue;
            case "minus":
              data -= parseFloat(array[++i]);
              continue;
            case "mul":
              data *= parseFloat(array[++i]);
              continue;
            case "div":
              data /= parseFloat(array[++i]);
              continue;
            default:
          }
        }
        data = parseFloat(array[i]);
      }
      if(data !== 0) setResult(data);
      addCalculating(result);
      addCalculating(value);
      number = '';
    }
  }

  const calculResult = () =>{
    let array = calculation.concat(result);
    let data = 0;

    for (let i = 0; i < array.length; i++) {
      if(typeof(array[i] === "string")){
        switch(array[i]){
          case "add":
            data += parseFloat(array[++i]);
            continue;
          case "minus":
            data -= parseFloat(array[++i]);
            continue;
          case "mul":
            data *= parseFloat(array[++i]);
            continue;
          case "div":
            data /= parseFloat(array[++i]);
            continue;
          default:
        }
      }
      data = parseFloat(array[i]);
    }
    setResult(data);
    updateCalculating(array);
    setCalculateDone(true);
  }

  const numberBack = ()=>{
    let data = result.toString();
    if(data.length > 0){
      data = data.substring(0, data.length-1); 
    }
    (data.length === 0) ? setResult('0') : setResult(data);
    number = data;
  }

  const numberClear = ()=>{
    number = '';
    setCalculateDone(false);
    updateCalculating([]);
    setResult(0);
  }

  return (
    <div className="dataButton">
      <div>
        <Button onClick={() => numberHandler("sqrt")}>√</Button>
        <Button onClick={() => numberHandler("reciprocal")}>1/x</Button>
        <Button onClick={() => numberHandler("square")}>squ</Button>
        <Button onClick={() => numberHandler("cube")}>cube</Button>
      </div>
      <div>
        <Button onClick={() => numberClear()}>AC</Button>
        <Button onClick={() => numberHandler("rem")}>%</Button>
        <Button onClick={() => numberBack()}>
          <Icon type="arrow-left" />
        </Button>
        <Button onClick={() => numberHandler("div")}>
          <Icon type="vertical-align-middle" />
        </Button>
      </div>
      <div>
        <Button onClick={() => numberHandler(7)}>7</Button>
        <Button onClick={() => numberHandler(8)}>8</Button>
        <Button onClick={() => numberHandler(9)}>9</Button>
        <Button onClick={() => numberHandler("add")}>
          <Icon type="plus" />
        </Button>
      </div>
      <div>
        <Button onClick={() => numberHandler(4)}>4</Button>
        <Button onClick={() => numberHandler(5)}>5</Button>
        <Button onClick={() => numberHandler(6)}>6</Button>
        <Button onClick={() => numberHandler("minus")}>
          <Icon type="minus" />
        </Button>
      </div>
      <div>
        <Button onClick={() => numberHandler(1)}>1</Button>
        <Button onClick={() => numberHandler(2)}>2</Button>
        <Button onClick={() => numberHandler(3)}>3</Button>
        <Button onClick={() => numberHandler("mul")}>
          <Icon type="close" />
        </Button>
      </div>
      <div>
        <Button onClick={() => numberHandler("rev")}>±</Button>
        <Button onClick={() => numberHandler(0)}>0</Button>
        <Button onClick={() => numberHandler("dot")}>.</Button>
        <Button onClick={()=> calculResult()}>
          <Icon type="pause" rotate="90"/>
        </Button>
      </div>
    </div>
  )
}

export default Body
