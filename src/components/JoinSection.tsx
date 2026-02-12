import { useState, useRef, useEffect } from "react";
import { Instagram } from "lucide-react";

const JoinSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 md:px-16 border-t border-border"
    >
      <div
        className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-4xl md:text-6xl font-mono font-bold text-foreground mb-4 tracking-tight">
          JOIN THE VOID
        </h2>
        <p className="text-sm text-muted-foreground font-mono mb-12 max-w-sm mx-auto">
          Be the first to know when the drop hits. No spam. Only signal.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full bg-transparent border border-border px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-foreground text-primary-foreground text-xs font-mono tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors whitespace-nowrap"
            >
              Enter
            </button>
          </form>
        ) : (
          <div className="space-y-2">
            <p className="text-sm font-mono text-foreground">You're in the void now.</p>
            <p className="text-[10px] text-muted-foreground font-mono tracking-widest">
              WATCH YOUR INBOX
            </p>
          </div>
        )}

        {/* Socials */}
        <div className="mt-20 flex items-center justify-center gap-6">
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <span className="text-[10px] text-muted-foreground/30 font-mono">×</span>
          <a
            href="#"
            className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            TikTok
          </a>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
