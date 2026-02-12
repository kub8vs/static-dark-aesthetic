import { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled ? "py-3 bg-background/80 backdrop-blur-md border-b border-border" : "py-6"
      }`}
    >
      <div className="flex items-center justify-center">
        <span
          className={`font-mono text-xs tracking-[0.5em] uppercase text-foreground transition-opacity duration-700 ${
            scrolled ? "opacity-100" : "opacity-60"
          }`}
        >
          STATIC
        </span>
      </div>
    </header>
  );
};

export default Header;
