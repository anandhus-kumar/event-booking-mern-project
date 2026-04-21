import React, { useEffect, useState } from "react";
import api from "../utils/axios";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaRegClock,
  FaTicketAlt,
  FaShieldAlt,
} from "react-icons/fa";

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
    <section id="hero">
      <div className="relative bg-black text-white overflow-hidden mb-12 shadow-2xl min-h-200">
        <div className=" absolute inset-0  bg-[url('/hero.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-transparent"></div>
          <div className="relative p-10 md:p-20 text-center flex flex-col items-center z-10 mt-26">
            <span className="bg-txtwhite/20 text-white backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 border border-white/20 ">
              {" "}
              Welcome to EventHive
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6  bg-gradient-to-br from-orange-300 via-orange-100 to-white text-transparent bg-clip-text tracking-tight drop-shadow-lg">
              Make Every Moment Memorable
            </h1>
            <p className="text-gray-200  text-lg md:text-xl mb-15 max-w-3xl mx-auto font-light leading-relaxed">
              Discover events that bring people together and create
              unforgettable experiences.
            </p>
            <div className="w-full max-w-2xl mx-auto relative flex items-center shadow-2xl group">
              <FaSearch className="absolute z-50 left-6 text-gray-50 text-xl group-focus-within:text-gray-500 transition-colors" />
              <input
                type="text"
                placeholder="Search events by title, category, location..."
                className="w-full pl-16 pr-6 py-5 rounded-full text-md text-black bg-transparent backdrop-blur-sm border-2 border-white focus:border-gray-500 focus:outline-none transition-all placeholder-gray-300 font-light"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
