import { CLEAN_DETAIL, FILTER_ORIGIN, FILTER_TEMPERAMENT, GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, GET_DOG_BY_ID, GET_DOG_BY_NAME, ORDER_DOG } from "../actions/action-types";

const inicialState = {
  allDogs: [],
  allDogsCopy: [],

  allTemperaments: [],
  allTemperamentsCopy: [],

  detailDog: {},

  filterTemperament: "default",
  filterOrigin: "default",
}

function reducer(state = inicialState, action){
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        allDogsCopy: action.payload,
      }
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        allTemperaments: action.payload,
        allTemperamentsCopy: action.payload,
      }
    case GET_DOG_BY_NAME:
      return{
        ...state,
        allDogs: action.payload
      }
    case GET_DOG_BY_ID:
      return{
        ...state,
        detailDog: action.payload
      }
    case CLEAN_DETAIL:
      return{
        ...state,
        detailDog: {}
      }
    case ORDER_DOG:
      switch(action.payload){
        case "ascendente":
          const allDogsASC = [...state.allDogs].sort((a, b) => a.nombre.localeCompare(b.nombre));
          return{
            ...state,
            allDogs: allDogsASC
          }
        case "descendente":
          const allDogsDES = [...state.allDogs].sort((a, b) => b.nombre.localeCompare(a.nombre));
          return{
            ...state,
            allDogs: allDogsDES
          }
        case "menosPeso":
          const allDogsMenosPeso = [...state.allDogs].sort((a, b) => {
            // Dividir la cadena y convertir en números enteros
            const [pesoAInicio, pesoAFin] = a.peso.split(" - ").map(num => isNaN(parseInt(num)) ? Infinity : parseInt(num));
            const [pesoBInicio, pesoBFin] = b.peso.split(" - ").map(num => isNaN(parseInt(num)) ? Infinity : parseInt(num));
          
            // Si alguno es NaN, lo colocamos al principio
            if (isNaN(pesoAInicio) || isNaN(pesoBInicio)) {
              return isNaN(pesoAInicio) ? -1 : 1;
            }
          
            // Comparar la parte izquierda (inicio)
            if (pesoAInicio !== pesoBInicio) {
              return pesoAInicio - pesoBInicio; // Ordenar por la parte izquierda
            } else {
              // Si la parte izquierda es la misma, comparar la parte derecha (fin)
              return pesoAFin - pesoBFin; // Ordenar por la parte derecha
            }
          });
          
          return {
            ...state,
            allDogs: allDogsMenosPeso
          };
          
          return {
            ...state,
            allDogs: allDogsMenosPeso
          };
        case "masPeso":
          const allDogsMasPeso = [...state.allDogs].sort((a, b) =>{
            const pesoA = parseInt(a.peso.split(" - ")[1] || a.peso.split(" - ")[0]);
            const pesoB = parseInt(b.peso.split(" - ")[1] || b.peso.split(" - ")[0]);
            return pesoB - pesoA;
          });
          return{
            ...state,
            allDogs: allDogsMasPeso
          }
        case "default":
        return{
          ...state,
          allDogs: [...state.allDogsCopy]
        }
        default:
          return{
            ...state,
          }
      }
    case FILTER_TEMPERAMENT:
      if(state.filterOrigin !== "default"){
        const allDogsFilterOrigin = state.filterOrigin === "api" ? [...state.allDogsCopy].filter((dog) => dog?.origen === "api") : [...state.allDogsCopy].filter((dog) => dog?.origen === "db");
        const allDogsFilterTemperament = action.payload === "default" ? allDogsFilterOrigin : allDogsFilterOrigin.filter((dog) => dog?.temperamentos?.some((temperamento) => temperamento === action.payload));
        return {
          ...state,
          allDogs: allDogsFilterTemperament,
          filterTemperament: action.payload
        }
      }else{
        const allDogsFilterTemperament = action.payload === "default" ? [...state.allDogsCopy] : [...state.allDogs].filter((dog) => dog?.temperamentos?.some((temperamento) => temperamento === action.payload));
        return {
          ...state,
          allDogs: allDogsFilterTemperament,
          filterTemperament: action.payload
        }
      }
    case FILTER_ORIGIN:
      if(state.filterTemperament !== "default"){
        const allDogsFilterTemperament = [...state.allDogsCopy].filter((dog) => dog.temperamentos?.some(temperamento => temperamento === state.filterTemperament));
        if(action.payload === "api"){
          const allDogsFilterOrigin = allDogsFilterTemperament.filter((dog) => dog.origen === "api");
          return {
            ...state,
            allDogs: allDogsFilterOrigin,
            filterOrigin: action.payload
          }
        }else{
          const allDogsFilterOrigin = action.payload === "default" ? allDogsFilterTemperament : allDogsFilterTemperament.filter((dog) => dog.origen === "db");
          return {
            ...state,
            allDogs: allDogsFilterOrigin,
            filterOrigin: action.payload
          }
        }
      }else{
        if(action.payload === "api"){
          const allDogsFilterOrigin = action.payload === "default" ? [...state.allDogsCopy] : [...state.allDogsCopy].filter((dog) => dog?.origen === "api")
          return {
            ...state,
            allDogs: allDogsFilterOrigin,
            filterOrigin: action.payload
          }
        }else{
          const allDogsFilterOrigin = action.payload === "default" ? [...state.allDogsCopy] : [...state.allDogsCopy].filter((dog) => dog?.origen === "db")
          return {
            ...state,
            allDogs: allDogsFilterOrigin,
            filterOrigin: action.payload
          }
        }
      }
    default:
      return{
        ...state
      }
  }
}


export default reducer;