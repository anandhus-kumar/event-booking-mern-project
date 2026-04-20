import React, { useEffect, useState } from "react";
import api from "../utils/axios";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get(`/events?search=${search}`);
      setEvents(data);
    } catch (error) {
      console.error("error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchEvents(), 400);
    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <section className="hero w-full ">
      <div className="w-full  bg-txtwhite">
        <h3>EventHive</h3>
        <input type="text" placeholder="Enter any Events" />
      </div>
    </section>
  );
};

export default Home;
