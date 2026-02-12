import { useState, useRef, useEffect } from "react";

const JoinSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [inboxUrl, setInboxUrl] = useState<string | null>(null);
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

  const getInboxUrl = (userEmail: string) => {
    const domain = userEmail.split("@")[1]?.toLowerCase();
    const providers: { [key: string]: string } = {
      "gmail.com": "https://mail.google.com",
      "outlook.com": "https://outlook.live.com",
      "hotmail.com": "https://outlook.live.com",
      "yahoo.com": "https://mail.yahoo.com",
      "icloud.com": "https://www.icloud.com/mail",
      "wp.pl": "https://poczta.wp.pl",
      "onet.pl": "https://poczta.onet.pl",
      "o2.pl": "https://poczta.o2.pl",
      "interia.pl": "https://poczta.interia.pl",
    };
    return providers[domain] || null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setInboxUrl(getInboxUrl(email));
      setSubmitted(true);
    }
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
          JOIN TO COMMUNITY
        </h2>
        <p className="text-sm text-muted-foreground font-mono mb-12 max-w-sm mx-auto uppercase tracking-wider">
          Concept & Made by Static Lab
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR@MAIL.COM"
              required
              className="w-full bg-transparent border border-border px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors uppercase"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-foreground text-primary-foreground text-xs font-mono tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors whitespace-nowrap"
            >
              Enter
            </button>
          </form>
        ) : (
          <div className="space-y-4 animate-blur-in">
            <p className="text-sm font-mono text-foreground italic">You're in the void now.</p>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
                Watch your inbox
              </p>
              {inboxUrl && (
                <a 
                  href={inboxUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-foreground border-b border-foreground/30 hover:border-foreground transition-all pt-1"
                >
                  GO TO MAIL &rarr;
                </a>
              )}
            </div>
          </div>
        )}

        {/* Socials - Same style for both */}
        <div className="mt-20 flex items-center justify-center gap-6">
          <a
            href="https://www.instagram.com/staticlab_?igsh=MWIyZnoxYWRiNGlpbw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Instagram
          </a>
          <span className="text-[10px] text-muted-foreground/30 font-mono">×</span>
          <a
            href="https://www.tiktok.com/@steezlab?_r=1&_t=ZN-93rsiROHjqo"
            target="_blank"
            rel="noopener noreferrer"
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