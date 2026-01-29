import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, Quote } from "lucide-react";

const ClientsSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/clients");
      setClients(response.data.data || response.data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading clients...</p>;
  }

  return (
    <section>
      <h2>Happy Clients</h2>

      {clients.length === 0 ? (
        <p>No clients found</p>
      ) : (
        <div>
          <Quote size={32} />
          <p>{clients[activeIndex]?.description}</p>

          <h4>{clients[activeIndex]?.name}</h4>
          <p>{clients[activeIndex]?.designation}</p>

          <div>
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
              >
                <Star size={16} />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ClientsSection;
