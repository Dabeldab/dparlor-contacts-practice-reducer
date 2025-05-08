export const initialStore=()=>{
  return{
  contacts:[]
  }
}


export default function storeReducer(store, action = {}) {
  switch(action.type){
      case 'fetchedContacts':
        const contactArray = action.payload;
        console.log("in reducer",contactArray)
        return {
          ...store,
          contacts: [...contactArray]
        }
    default:
return store
  }    
}
