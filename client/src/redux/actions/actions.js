import { GET_ALL_DOGS } from "./action-types";
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