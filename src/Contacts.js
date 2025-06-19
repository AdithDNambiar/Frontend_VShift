import React, { useEffect, useState } from "react";
import axios from "axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://backendvshift-production.up.railway.app/hubspot/contacts")
      .then((res) => {
        if (res.data.results) {
          setContacts(res.data.results);
        } else {
          setError("No contacts found.");
        }
      })
      .catch(() => setError("Failed to fetch contacts."));
  }, []);

  return (
    <div>
      <h2>HubSpot Contacts</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {contacts.length > 0 ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <strong>{contact.properties.firstname} {contact.properties.lastname}</strong><br />
              {contact.properties.email}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>Loading contacts...</p>
      )}
    </div>
  );
};

export default Contacts;
