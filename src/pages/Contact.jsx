import { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { Await, Link } from "react-router-dom"
import { ContactCard } from "../components/ContactCard"

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetchAllContacts();
  }, []);

  const fetchAllContacts = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/dariusp/contacts"
      );
      const data = await response.json();
      console.log("API Data:", data);  // Debug
      dispatch({
        type: "fetchedContacts",
        payload: data.contacts || [],
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };


  
  return (
    <>
    <div>
    <Link to="/addcontact">
    <button className="btn button-primary">Add a Contact</button>
    </Link>
    </div>
    <div className="container">
      {!store || !store.contacts ? (
        <h1>Loading...</h1>
      ) : store.contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (

      
        store.contacts.map((contact) => (
        
          
          <ul className="list-group-item" key={contact.id || Math.random()}>
            <ContactCard
              name={contact.name}
              phone={contact.phone}
              email={contact.email}
              address={contact.address}
              key={contact.id} 
              contact={contact}
            />
          </ul>
        ))
      )}
    </div>
    </>
  );
};