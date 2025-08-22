import { useEffect, useState } from "react";
import FeatureCards from "../components/landing/FeatureCards/FeatureCards";
import Testimonials from "../components/landing/Testimonials/Testimonials";
import StartBuilding from "../components/landing/StartBuilding/StartBuilding";
import PlasmaWaveV2 from "../components/landing/PlasmaWave/PlasmaWaveV2";
import Announcement from "../components/common/Misc/Announcement";
import Footer from "../components/landing/Footer/Footer";
import Hero from "../components/landing/Hero/Hero";
import heroImage from "../assets/common/hero.webp";

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <section className="landing-wrapper">
      <title>React Bits - Animated UI Components For React</title>

      <Announcement />

      {isMobile && (
        <div className="mobile-hero-background-container">
          <img
            src={heroImage}
            alt="Hero background"
            className="mobile-hero-background-image"
          />
        </div>
      )}

      <PlasmaWaveV2 yOffset={-300} xOffset={100} rotationDeg={-30} />
      <Hero />
      <FeatureCards />
      <Testimonials />
      <StartBuilding />
      <Footer />
    </section>
  );
};

export default LandingPage;
