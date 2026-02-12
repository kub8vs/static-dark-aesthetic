import { useEffect, useRef, useState } from "react";
import craft1 from "@/assets/craft-1.jpg";
import craft2 from "@/assets/craft-2.jpg";

const CraftSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Left: Images */}
        <div className="lg:col-span-5 relative">
          <div className="relative">
            <img
              src={craft1}
              alt="The craft - handmade process"
              className="w-3/4 object-cover grayscale"
              loading="lazy"
            />
            <img
              src={craft2}
              alt="Design sketches"
              className="absolute -bottom-12 -right-4 w-2/3 object-cover grayscale border-4 border-background"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right: Text */}
        <div className="lg:col-span-6 lg:col-start-7 space-y-8 mt-16 lg:mt-0">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-muted-foreground/40" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-mono">
              The Craft
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-mono font-bold text-foreground leading-tight">
            Every stitch is
            <br />
            <span className="text-stroke">a choice.</span>
          </h2>

          <p className="text-sm text-muted-foreground font-mono leading-relaxed max-w-md">
            Every piece is a ghost of the process. No factories, no shortcuts —
            just raw material and obsession. Each garment carries the weight of
            its own creation.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-4">
            {[
              { num: "001", label: "Handmade" },
              { num: "002", label: "Limited" },
              { num: "003", label: "One-off" },
            ].map((item) => (
              <div key={item.num} className="space-y-1">
                <span className="text-[10px] text-muted-foreground/50 font-mono">
                  {item.num}
                </span>
                <p className="text-xs font-mono text-foreground tracking-wider uppercase">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftSection;
