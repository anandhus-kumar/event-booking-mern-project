import React, { useEffect, useState } from "react";
// import api from "../utils/axios";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaRegClock,
  FaTicketAlt,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";
import { features } from "../constants/data";
import { Link } from "react-router-dom";
import api from "../utils/axios";

const events = [
  {
    _id: "1",
    title: "Tech Meetup 2026",
    category: "Technology",
    date: "2026-05-10T10:00:00Z",
    location: "Trivandrum Technopark",
    ticketPrice: 0,
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    totalSeats: 100,
    availableSeats: 45,
  },
  {
    _id: "2",
    title: "Startup Networking Night",
    category: "Business",
    date: "2026-05-15T18:30:00Z",
    location: "Kochi Infopark",
    ticketPrice: 299,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    totalSeats: 80,
    availableSeats: 20,
  },
  {
    _id: "3",
    title: "Music Fest Live",
    category: "Music",
    date: "2026-06-01T16:00:00Z",
    location: "Kovalam Beach",
    ticketPrice: 499,
    image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
    totalSeats: 200,
    availableSeats: 150,
  },
  {
    _id: "4",
    title: "Photography Workshop",
    category: "Workshop",
    date: "2026-05-20T09:00:00Z",
    location: "Veli Tourist Village",
    ticketPrice: 199,
    image: "",
    totalSeats: 50,
    availableSeats: 10,
  },
  {
    _id: "5",
    title: "Food Carnival",
    category: "Food",
    date: "2026-06-05T12:00:00Z",
    location: "Kanakakunnu Palace Grounds",
    ticketPrice: 0,
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    totalSeats: 300,
    availableSeats: 220,
  },
];

const Home = ({ heroRef }) => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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
    <>
      {/*  hero secrion */}
      <section id="hero" ref={heroRef}>
        <div className="relative bg-black text-white overflow-hidden mb-12 shadow-2xl min-h-screen">
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
              <p className="text-gray-200  text-lg md:text-xl mb-15 max-w-3xl mx-auto font-light leading-tight tracking-tighter">
                Discover events that bring people together and create
                unforgettable experiences.
              </p>
              <div className="w-full max-w-2xl mx-auto relative flex items-center shadow-2xl group">
                <FaSearch className="absolute z-50 left-6 text-gray-50 text-xl group-focus-within:text-gray-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search events by title, category, location..."
                  className="w-full pl-16 pr-6 py-5 rounded-full text-md text-white bg-transparent backdrop-blur-sm border-2 border-white focus:border-orange-500 focus:outline-none transition-all placeholder-gray-300 font-light"
                  // value={search}
                  // onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* features row */}

      <section id="feature " className=" py-6">
        <div className=" text-center mb-10 py-5">
          <h3 className="md:text-5xl  text-3xl font-medium text-txtbrown   ">
            Why choose us
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16  px-4 max-w-7xl mx-auto">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl shadow-sm border border-orange-200 flex flex-col items-center text-center 
  hover:-translate-y-1 hover:scale-[1.02] 
  transition-all duration-500 
  bg-gradient-to-r from-orange-100 via-white to-orange-100 
  bg-[length:200%_auto] bg-position-[left_center] hover:bg-position-[right_center]"
              >
                <div className="w-16 h-16 bg-txtorange text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md shadow-gray-200/50">
                  <Icon />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-900 text-sm leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="upcomming "
        className=" relative w-full bg-[url('/event.jpg')] bg-cover bg-center"
      >
        {" "}
        <div className="flex  w-full mx-auto items-center justify-between mb-8  max-w-7xl  px-3  py-5 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-extrabold text-white">
            Upcoming Events
          </h2>
          <div className="text-white font-medium">
            {events.length} results found
          </div>
        </div>
        {loading ? (
          <div className="text-center py-20 text-xl font-semibold text-gray-600">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 text-xl text-gray-500">
            No events found matching your search.
          </div>
        ) : (
          <div className=" max-w-7xl mx-auto pb-7 px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col"
              >
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-2xl">
                      {event.category || "Event"}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    {event.ticketPrice === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      <span className="text-gray-900">
                        ₹{event.ticketPrice}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    {event.category}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    {event.title}
                  </h2>
                  <div className="flex flex-col gap-2 mb-4 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>
                        {new Date(event.date).toLocaleDateString(undefined, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-gray-700 h-2 rounded-full"
                        style={{
                          width: `${(event.availableSeats / event.totalSeats) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">
                      {event.availableSeats} of {event.totalSeats} seats
                      remaining
                    </p>
                    <Link
                      to={`/events/${event._id}`}
                      className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 rounded-lg transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="mt-auto pt-16 pb-8 border-t border-gray-200 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <FaTicketAlt className="text-gray-800 text-2xl" />
          <span className="text-xl font-bold text-gray-900">Eventhive</span>
        </div>
        <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
          The simplest, most dynamic way to manage, discover, and host
          world-class events in your local city. Let's make memories together.
        </p>
        <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          &copy; {new Date().getFullYear()} Eventora Platform. All rights
          reserved.
        </div>
      </footer>
    </>
  );
};

export default Home;
