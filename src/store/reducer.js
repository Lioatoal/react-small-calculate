const initCalculation = [];

export const calculation = (state = initCalculation, action) =>{
  switch(action.type){
    case "add":
      return [...state, action.data];
    case "update":
      return action.data;
    case "updateLast":
      let max = state.length -1;  
      state[max] = action.data; 
      return state;
    default:
      return state;
  }
}
