import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import "./FeatureCards.css";
import CountUp from "../../../content/TextAnimations/CountUp/CountUp";

const ParticleCard = ({ children, className = "", disableAnimations = false }) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInit = useRef(false);

  const createParticle = useCallback((x, y) => {
    const el = document.createElement("div");
    el.className = "particle";
    el.style.cssText = `
      position:absolute;width:4px;height:4px;border-radius:50%;
      background:rgba(132,0,255,1);box-shadow:0 0 6px rgba(132,0,255,.6);
      pointer-events:none;z-index:100;left:${x}px;top:${y}px;
    `;
    return el;
  }, []);

  const memoizeParticles = useCallback(() => {
    if (particlesInit.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    Array.from({ length: 12 }).forEach(() => {
      memoizedParticles.current.push(createParticle(Math.random() * width, Math.random() * height));
    });
    particlesInit.current = true;
  }, [createParticle]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(p =>
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => p.parentNode && p.parentNode.removeChild(p),
      })
    );
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInit.current) memoizeParticles();

    memoizedParticles.current.forEach((particle, i) => {
      const id = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.set(clone, { scale: 0, opacity: 0 });
        gsap.to(clone, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: "power2.inOut", repeat: -1, yoyo: true });
      }, i * 100);
      timeoutsRef.current.push(id);
    });
  }, [memoizeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const handleIn = () => { isHoveredRef.current = true; animateParticles(); };
    const handleOut = () => { isHoveredRef.current = false; clearParticles(); };

    const node = cardRef.current;
    node.addEventListener("mouseenter", handleIn);
    node.addEventListener("mouseleave", handleOut);
    return () => {
      isHoveredRef.current = false;
      node.removeEventListener("mouseenter", handleIn);
      node.removeEventListener("mouseleave", handleOut);
      clearParticles();
    };
  }, [animateParticles, clearParticles, disableAnimations]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight = ({ gridRef, disableAnimations = false }) => {
  const spotlightRef = useRef(null);
  const isInsideSectionRef = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;
      background:radial-gradient(circle,rgba(132,0,255,.15) 0%,rgba(132,0,255,.08) 15%,
      rgba(132,0,255,.04) 25%,rgba(132,0,255,.02) 40%,rgba(132,0,255,.01) 65%,transparent 70%);
      z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const move = e => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest(".features-section");
      const rect = section?.getBoundingClientRect();
      const inside =
        rect &&
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSectionRef.current = inside;
      const cards = gridRef.current.querySelectorAll(".feature-card");

      if (!inside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
        cards.forEach(card => card.style.setProperty("--glow-intensity", "0"));
        return;
      }

      let minDist = Infinity;
      const prox = 100, fade = 150;
      cards.forEach(card => {
        const r = card.getBoundingClientRect(),
          cx = r.left + r.width / 2,
          cy = r.top + r.height / 2,
          d = Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2,
          ed = Math.max(0, d);
        minDist = Math.min(minDist, ed);

        const rx = ((e.clientX - r.left) / r.width) * 100,
          ry = ((e.clientY - r.top) / r.height) * 100;
        let glow = 0;
        if (ed <= prox) glow = 1;
        else if (ed <= fade) glow = (fade - ed) / (fade - prox);
        card.style.setProperty("--glow-x", `${rx}%`);
        card.style.setProperty("--glow-y", `${ry}%`);
        card.style.setProperty("--glow-intensity", glow);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: "power2.out" });
      const target = minDist <= prox ? 0.8 : minDist <= fade ? ((fade - minDist) / (fade - prox)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: target, duration: target > 0 ? 0.2 : 0.5, ease: "power2.out" });
    };

    const leave = () => {
      isInsideSectionRef.current = false;
      gridRef.current
        ?.querySelectorAll(".feature-card")
        .forEach(card => card.style.setProperty("--glow-intensity", "0"));
      gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations]);

  return null;
};

const FeatureCards = () => {
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h3 className="features-title">Zero cost, all the cool.</h3>
          <p className="features-subtitle">Everything you need to add flair to your websites</p>
        </div>

        <GlobalSpotlight gridRef={gridRef} disableAnimations={isMobile} />

        <div className="bento-grid" ref={gridRef}>
          <ParticleCard className="feature-card card1" disableAnimations={isMobile}>
            <div className="messages-gif-wrapper">
              <img src="/assets/messages.gif" alt="Messages animation" className="messages-gif" />
            </div>
            <h2>{isMobile ? "100" : <CountUp to={100} />}%</h2>
            <h3>Free &amp; Open Source</h3>
            <p>Loved by developers around the world</p>
          </ParticleCard>

          <ParticleCard className="feature-card card2" disableAnimations={isMobile}>
            <div className="components-gif-wrapper">
              <img src="/assets/components.gif" alt="Components animation" className="components-gif" />
            </div>
            <h2>{isMobile ? "100" : <CountUp to={100} />}+</h2>
            <h3>Curated Components</h3>
            <p>Growing weekly &amp; only getting better</p>
          </ParticleCard>

          <ParticleCard className="feature-card card4" disableAnimations={isMobile}>
            <div className="switch-gif-wrapper">
              <img src="/assets/switch.gif" alt="Switch animation" className="switch-gif" />
            </div>
            <h2>{isMobile ? "2" : <CountUp to={2} />}</h2>
            <h3>Styling Options</h3>
            <p>CSS or Tailwind, switch with one click</p>
          </ParticleCard>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
