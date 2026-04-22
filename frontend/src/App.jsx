import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

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
      <Home heroRef={heroRef} />
    </div>
  );
}

export default App;
