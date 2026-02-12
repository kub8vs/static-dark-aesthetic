import { useState, useEffect, useRef } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import { X } from "lucide-react"; // Import ikony zamknięcia

const images = [
  { src: gallery1, rotation: "-3deg", x: "5%", y: "0%", alt: "Archive 01" },
  { src: gallery2, rotation: "2deg", x: "55%", y: "5%", alt: "Archive 02" },
  { src: gallery3, rotation: "-1deg", x: "15%", y: "55%", alt: "Archive 03" },
  { src: gallery4, rotation: "3deg", x: "60%", y: "50%", alt: "Archive 04" },
];

const GallerySection = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [zoomedIdx, setZoomedIdx] = useState<number | null>(null); // Nowy stan dla zoomu
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

  // Blokowanie scrolla, gdy zdjęcie jest powiększone
  useEffect(() => {
    if (zoomedIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [zoomedIdx]);

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
              className="absolute w-[42%] md:w-[35%] lg:w-[30%] transition-all duration-500 cursor-zoom-in"
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
              onClick={() => setZoomedIdx(i)} // Otwieranie zoomu
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

      {/* Fullscreen Zoom Overlay */}
      {zoomedIdx !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 md:p-12 animate-blur-in cursor-zoom-out"
          onClick={() => setZoomedIdx(null)}
        >
          <button 
            className="absolute top-8 right-8 text-foreground/50 hover:text-foreground transition-colors"
            onClick={() => setZoomedIdx(null)}
          >
            <X size={32} strokeWidth={1} />
          </button>
          
          <div className="relative max-w-4xl w-full bg-card p-3 pb-12 shadow-2xl animate-fade-up">
            <img
              src={images[zoomedIdx].src}
              alt={images[zoomedIdx].alt}
              className="w-full h-auto max-h-[75vh] object-contain transition-all"
            />
            <p className="text-xs font-mono text-muted-foreground mt-4 tracking-[0.4em] uppercase text-center">
              {images[zoomedIdx].alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;