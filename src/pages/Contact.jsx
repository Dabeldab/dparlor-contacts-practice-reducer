import { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { Await, Link } from "react-router-dom"
import { ContactCard } from "../components/ContactCard"


export const Contact = () =>{
    const {store, dispatch } = useGlobalReducer()

    useEffect(() => {
        fetchAllContacts();
    }, [])

    const fetchAllContacts = async () => {
        const response = await fetch('https://playground.4geeks.com/contact/agendas/dariusp/contacts')
        try {
            if (!response.ok) {
                throw new Error(response.status)
            }
            const data = await response.json()
            console.log("not in reducer",data.contacts)
            
            dispatch({
                type: 'fetchedContacts',
                payload: data.contacts,
            })
        }
        catch  (error){
            console.error("Error getting agenda. Make sure the agenda was created.",error)
            }
        }
    

    return (
        <>
        <h1>Contact</h1>
        </>
    )
}

