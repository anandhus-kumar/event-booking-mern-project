import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const heroRef = useRef(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      },
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div className=" w-full min-h-screen">
      <Navbar isHeroVisible={isHeroVisible} />

      <Routes>
        <Route index path="/" element={<Home heroRef={heroRef} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
