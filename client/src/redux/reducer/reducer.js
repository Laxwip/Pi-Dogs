import { GET_ALL_DOGS } from "../actions/action-types";

const inicialState = {
  allDogs: [],
}

function reducer(state = inicialState, action){
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        allDogs: action.payload,
      }
    default:
      return{
        ...state
      }
  }
}