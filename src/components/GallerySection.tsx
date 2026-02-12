import { useState, useEffect, useRef } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const images = [
  { src: gallery1, rotation: "-3deg", x: "5%", y: "0%" },
  { src: gallery2, rotation: "2deg", x: "55%", y: "5%" },
  { src: gallery3, rotation: "-1deg", x: "15%", y: "55%" },
  { src: gallery4, rotation: "3deg", x: "60%", y: "50%" },
];

const GallerySection = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px w-8 bg-muted-foreground/40" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-mono">
            The Visuals
          </span>
        </div>

        {/* Polaroid grid */}
        <div
          className={`relative w-full h-[700px] md:h-[800px] transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="absolute w-[42%] md:w-[35%] lg:w-[30%] transition-all duration-500"
              style={{
                left: img.x,
                top: img.y,
                ["--rotation" as string]: img.rotation,
                transform: `rotate(${img.rotation})`,
                zIndex: activeIdx === i ? 20 : 10 - i,
                animationDelay: `${i * 0.15}s`,
              }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              <div
                className={`bg-card p-2 pb-8 shadow-2xl transition-all duration-500 ${
                  activeIdx !== null && activeIdx !== i
                    ? "opacity-30 scale-95"
                    : "opacity-100 scale-100"
                } ${
                  activeIdx === i ? "!rotate-0 scale-110" : ""
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <p className="text-[9px] font-mono text-muted-foreground mt-2 tracking-widest uppercase text-center">
                  {img.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
