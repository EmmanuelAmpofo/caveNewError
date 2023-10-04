import store from "../../store/mainStore/Store"
export const GET_BEARER_TOKEN =() => {
   return  store.getState().userReducer


}  