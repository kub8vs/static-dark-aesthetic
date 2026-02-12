import { useEffect, useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        // Próba odtworzenia z obsługą obietnicy (wymagane przez Chrome/Safari)
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Autoplay zablokowany, próbuję ponownie przy interakcji", error);
          });
        }
      }
    };

    playVideo();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background video */}
      <div className="absolute inset-0 bg-black"> {/* Czarny podkład na czas ładowania */}
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          webkit-playsinline="true" // Specjalny atrybut dla starszych wersji iOS
          preload="auto"
          className="w-full h-full object-cover opacity-40 pointer-events-none"
          onLoadedMetadata={() => {
            videoRef.current?.play();
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="w-full border-b border-foreground/20"
            style={{ height: "1.25vh" }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <h1
          className="text-[clamp(4rem,15vw,12rem)] font-mono font-bold tracking-[-0.02em] text-foreground leading-none animate-glitch select-none"
          style={{ textShadow: "0 0 80px hsl(0 0% 100% / 0.08)" }}
        >
          STATIC
        </h1>

        <div className="mt-8">
          <span className="text-sm font-mono tracking-[0.4em] uppercase text-muted-foreground animate-crt-pulse">
            SOON
          </span>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-muted-foreground">
          <div className="h-px w-12 bg-muted-foreground/30" />
          <span className="text-[10px] tracking-[0.3em] uppercase font-mono">
            Handmade Streetwear
            DM FOR CUSTOM
          </span>
          <div className="h-px w-12 bg-muted-foreground/30" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-muted-foreground/40" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-mono">
          Scroll
        </span>
      </div>
    </section>
  );
};

export default HeroSection;