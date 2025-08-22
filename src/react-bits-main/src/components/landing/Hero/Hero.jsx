import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SplitText from "../../../content/TextAnimations/SplitText/SplitText";
import DotGrid from "../../../content/Backgrounds/DotGrid/DotGrid";
import LetterGlitch from "../../../content/Backgrounds/LetterGlitch/LetterGlitch";
import Squares from "../../../content/Backgrounds/Squares/Squares";
import { Box } from "@chakra-ui/react";

const ResponsiveSplitText = ({ isMobile, text, ...rest }) =>
  isMobile ? (
    <span className={rest.className}>{text}</span>
  ) : (
    <SplitText text={text} {...rest} />
  );

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div className="landing-content">
      <div className="hero-main-content">
        <h1 className="landing-title">
          <ResponsiveSplitText
            isMobile={isMobile}
            text="Animated React components"
            className="hero-split"
            splitType="chars"
            delay={30}
            duration={2}
            ease="elastic.out(0.5, 0.3)"
          />
          <br />
          <ResponsiveSplitText
            isMobile={isMobile}
            text="for creative developers"
            className="hero-split"
            splitType="chars"
            delay={30}
            duration={2}
            ease="elastic.out(0.5, 0.3)"
          />
        </h1>

        <ResponsiveSplitText
          isMobile={isMobile}
          className="landing-subtitle"
          splitType="words"
          delay={10}
          duration={1}
          text="Over a hundred components, ready to be dropped into your React projects"
        />

        <Link to={"/text-animations/split-text"} className="landing-button">
          <span>Browse Components</span>
          <div className="button-arrow-circle">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="#4c1d95"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
      </div>

      {!isMobile && (
        <div className="hero-cards-container">
          <div
            className="hero-card hero-card-1"
            onClick={() =>
              window.open("https://reactbits.dev/backgrounds/dot-grid")
            }
          >
            <Box w="100%" h="100%" position="relative" className="hero-dot-grid">
              <DotGrid
                baseColor="#ffffff"
                activeColor="rgba(138, 43, 226, 0.9)"
                dotSize={8}
                gap={16}
                proximity={50}
              />
            </Box>
          </div>

          <div className="hero-cards-row">
            <div
              className="hero-card hero-card-2"
              onClick={() =>
                window.open("https://reactbits.dev/backgrounds/letter-glitch")
              }
            >
              <LetterGlitch
                className="hero-glitch"
                glitchColors={["#ffffff", "#999999", "#333333"]}
              />
            </div>

            <div
              className="hero-card hero-card-3"
              onClick={() =>
                window.open("https://reactbits.dev/backgrounds/squares")
              }
            >
              <Squares
                borderColor="#fff"
                speed={0.2}
                direction="diagonal"
                hoverFillColor="#fff"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
