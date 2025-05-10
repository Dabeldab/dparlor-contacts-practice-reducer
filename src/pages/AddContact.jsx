import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';

export const ContactForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [contact, setContact] = useState({
        name: '',
        address: '',
        phone: '',
        email: ''
    });

    // Load contact if editing
    useEffect(() => {
        if (id) {
            const existingContact = store.contact.find(c => c.id === id);
            if (existingContact) setContact(existingContact);
        }
    }, [id, store.contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = id 
                ? `https://playground.4geeks.com/contact/agendas/dariusp/contact/${id}`
                : 'https://playground.4geeks.com/contact/agendas/dariusp/contact';

            const method = id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact)
            });

            if (!response.ok) throw new Error(id ? 'Update failed' : 'Add failed');

            const result = await response.json();

            dispatch({
                type: id ? 'updateContact' : 'addContact',
                payload: id ? { ...contact, id } : result
            });

            navigate('/contact');
            alert(`Contact ${id ? 'updated' : 'added'} successfully!`);

        } catch (error) {
            console.error('Error:', error);
            alert(`Failed to ${id ? 'update' : 'add'} contact`);
        }
    };

    return (
        <div className="row add-contact-row">
            <div className="col-2"></div>
            <div className="col-8">
                <h2>{id ? 'Edit Contact' : 'Add New Contact'}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Form fields remain the same */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={contact.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                     <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={contact.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                     <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={contact.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                     <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Include other fields (address, phone, email) */}
                    
                    <button type="submit" className="btn btn-primary me-2">
                        {id ? 'Update Contact' : 'Add Contact'}
                    </button>
                    <Link to="/contact" className="btn btn-secondary">
                        Back to contact
                    </Link>
                </form>
            </div>
        </div>
    );
};
/*
export const AddContact = async(name, address, phone, email, dispatch) => {
    const newContact = {
        name: name,
        address: address,
        phone: phone,
        email: email,
    }

    const options = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addContact)
    }

    const response = await fetch('https://playground.4geeks.com/contact/agendas/rickr/contact', options)

    return (
        <>
        <div className="row add-contact-row">
            <div className="col-2"></div>
            <div className="col-8">
                <div className="mb-3">
                    <label htmlFor="contactName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactName"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        />
                        </div>
                        
                        <div className="mb-3">
                    <label htmlFor="contactName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactName"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        />
                </div>
            </div>
            
            </div>
        </>
    )
}
*/