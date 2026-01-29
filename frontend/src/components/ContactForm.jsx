import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/contacts", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", mobile: "", city: "" });
    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  };

  return (
    <section>
      <h2>Contact Us</h2>

      {success ? (
        <p>Form submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            placeholder="Mobile"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
          />

          <input
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
          />

          <button type="submit">Submit</button>
        </form>
      )}
    </section>
  );
};

export default ContactForm;
