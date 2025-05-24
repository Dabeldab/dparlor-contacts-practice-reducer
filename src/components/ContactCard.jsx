import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactForm } from "../pages/AddContact";

export const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState({ ...contact });
  const { name, phone, email, address } = contact || {};
  const [isSaving, setIsSaving] = useState(false);

    const handleDelete = async (e) => {
        
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/dariusp/contacts/${contact.id}`,
                {
                    method: "DELETE"
                }
            )
        if (!response.ok) throw new Error(id ? 'Delete failed': 'success')

        dispatch({
            type:  'deleteContact',
            payload:  {id: contact.id}
        })
        alert("Contact deleted!")
        navigate('/contact')
    then((result) => console.log(result))
    
        } catch {((error) => console.error(error))}
        
    }

  useEffect(() => {
    if (contact) {
      setEditedContact({ ...contact });
    }
  }, [contact]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedContact(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
        if (!editedContact) return;
    
    setIsSaving(true);
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/dariusp/contacts/${contact.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editedContact)
        }
      );

      if (!response.ok) throw new Error('Update failed');

      dispatch({
        type: 'updateContact',
        payload: editedContact
      });
      await new Promise(resolve => setTimeout(resolve, 100));

      setIsEditing(false);
      alert('Contact updated successfully!');
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Failed to update contact');
    }
    window.location.reload(false);
  };

  return (
    
    <div className="container d-flex mb-3 p-3 border rounded" key={contact.id}>
      <div>
        <img 
          src="https://avatar.iran.liara.run/public/44" 
          className="rounded-circle me-3" 
          alt="profile" 
          width="100"
          height="100"
        />
      </div>
      
      {isEditing ? (
        <div className="flex-grow-1">
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              name="name"
              value={editedContact.name}
              onChange={handleEditChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              name="address"
              value={editedContact.address}
              onChange={handleEditChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="tel"
              className="form-control form-control-sm"
              name="phone"
              value={editedContact.phone}
              onChange={handleEditChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-sm"
              name="email"
              value={editedContact.email}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <button onClick={handleSave} className="btn btn-sm btn-success me-2">
              Save
            </button>
            <button 
              onClick={() => {
                setIsEditing(false);
                setEditedContact({ ...contact }); // Reset changes
              }} 
              className="btn btn-sm btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-grow-1">
          <h5>{contact.name}</h5>
          <p className="mb-1"><i className="fa-solid fa-location-dot"></i> {contact.address}</p>
          <p className="mb-1"><i className="fa-solid fa-phone"></i> {contact.phone}</p>
          <p className="mb-3"><i className="fa-solid fa-envelope"></i> {contact.email}</p>
          <div>
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn btn-sm btn-outline-primary me-2"
            >
              Edit
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete()}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};