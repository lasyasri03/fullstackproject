import React, { useState } from "react";
import axios from "axios";
import { Mail, Check, Send } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/subscribers", { email });
      setSubscribed(true);
      setEmail("");

      setTimeout(() => setSubscribed(false), 5000);
    } catch (error) {
      alert("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Newsletter</h2>

      {subscribed ? (
        <p className="text-green-600 flex items-center gap-2">
          <Check /> Subscribed successfully!
        </p>
      ) : (
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 flex-1"
          />
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="bg-blue-600 text-white px-4 flex items-center gap-2"
          >
            {loading ? "..." : <Send size={16} />}
            Subscribe
          </button>
        </div>
      )}
    </section>
  );
};

export default Newsletter;
