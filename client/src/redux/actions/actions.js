import { GET_ALL_DOGS, GET_DOG_BY_NAME, GET_DOG_BY_ID, CLEAN_DETAIL, ORDER_DOG, FILTER_TEMPERAMENT, FILTER_ORIGIN } from "./action-types";
import axios from "axios";

export function getAllDogs(){
  return async (dispatch) => {
    try {
      const {data} = (await axios.get(`http://localhost:3001/dogs`));

      const dataApi = data.apiResults
      const dataDb = data.dbResults
      const allData = dataApi.concat(dataDb)

      return dispatch({type: GET_ALL_DOGS, payload: allData})
    } catch (error) {
      console.log(error)
    }
  }
}

export function getDogByName(name){
  return async (dispatch) => {
    if (name === "") {
      return dispatch(getAllDogs());
    }
    try {
      const {data} = (await axios.get(`http://localhost:3001/dogs/name?name=${name}`));

      const dataApi = data.apiResults
      const dataDb = data.dbResults
      const allData = dataApi.concat(dataDb)

      return dispatch({type: GET_DOG_BY_NAME, payload: allData})
    } catch (error) {
      console.log(error);
    }
  }
}

export function getDogById(origen, id){
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`http://localhost:3001/dogs/${id}`)

      let perroFinal = null

      if(origen === "api"){
        perroFinal = data?.apiResults
      } else if (origen === "db") {
        perroFinal = data?.dbResults
      }

      return dispatch({type: GET_DOG_BY_ID, payload: perroFinal})
    } catch (error) {
      console.log(error);
    }
  }
}

export const cleanDetail = () =>{
  return {type: CLEAN_DETAIL}
}

export const orderDog = (order) =>{
  return function(dispatch){
    return dispatch({type: ORDER_DOG, payload: order});
  }
}

export const filterTemperament = (temperament) => {
  return function(dispatch){
    return dispatch({type: FILTER_TEMPERAMENT, payload: temperament})
  }
}

export const filterOrigin = (origin) => {
  return function(dispatch){
    return dispatch({type: FILTER_ORIGIN, payload: origin})
  }
}