export const initialStore=()=>{
  return{
  contacts:[]
  }
}


export default function storeReducer(store, action = {}) {
  switch(action.type){
      case 'fetchedContacts':
        const contactArray = action.payload;
        return {
          ...store,
          contacts: [...contactArray]
        }
        case 'updateContact' :
          return {
            ...store,
            contacts: store.contacts.map(contact =>
              contact.id === action.payload.id ? CompositionEvent.payload : contact
            )
          }
    default:
return store
  }    
}
