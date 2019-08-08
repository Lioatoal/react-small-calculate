import store from './index'

const dispatch = store.dispatch;

export const addCalculating = value =>{
  dispatch({type:"add", data: value});
}

export const updateCalculating = value =>{
  dispatch({type:"update", data: value});
}

export const updateLastCalculating = value =>{
  dispatch({type:"updateLast", data: value});
}
