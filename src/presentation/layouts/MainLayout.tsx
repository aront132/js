import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

type Star = {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  color: string;
};

const MainLayout = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const colors = ["rgba(255,255,255,0.95)", "rgba(173,216,230,0.95)", "rgba(158,255,208,0.95)"];
    const total = 140;
    const next: Star[] = [];
    for (let i = 0; i < total; i++) {
      const size = Math.random() * 2.5 + 0.7; // 0.7 - 3.2px
      next.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Number(size.toFixed(2)),
        opacity: Number((Math.random() * 0.7 + 0.25).toFixed(2)),
        delay: Number((Math.random() * 6).toFixed(2)),
        duration: Number((Math.random() * 4 + 2).toFixed(2)),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setStars(next);
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column position-relative">
    
      <div className="stars-wrapper" aria-hidden>
        {stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDelay: `${s.delay}s, ${s.delay / 2}s`,
              animationDuration: `${s.duration}s, ${60 + (s.duration * 5)}s`,
              background: s.color,
              boxShadow: `0 0 ${Math.max(4, s.size * 4)}px ${s.color}`,
            }}
          />
        ))}
      </div>

      <div className="site-content d-flex flex-column flex-grow-1" style={{ position: "relative", zIndex: 2 }}>
        <Nav />
        <main className="flex-grow-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
