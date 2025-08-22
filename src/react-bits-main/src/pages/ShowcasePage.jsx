import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

import FadeContent from "../content/Animations/FadeContent/FadeContent";
import Footer from "../components/landing/Footer/Footer";

import '../css/showcase.css';

const ShowcasePage = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const showcaseItems = [
    {
      name: 'Devraj',
      url: 'https://devrajchatribin.com/about',
      using: '<CountUp />'
    },
    {
      name: 'Abdullah Shafiq',
      url: 'https://resume-tex.vercel.app',
      using: '<Squares />'
    },
    {
      name: 'Oscar Hernandez',
      url: 'https://oscarhernandez.vercel.app',
      using: '<LetterGlitch />'
    },
    {
      name: 'Afaq Razaq',
      url: 'https://www.evolvion.io/',
      using: '<SpotlightCard />'
    },
    {
      name: 'Jimmy',
      url: 'https://about.jimmy-blog.top/',
      using: '<Squares />'
    }
  ];

  return (
    <>
      <section className="showcase-wrapper">
        <title>React Bits - Showcase 🎉</title>

        <div className="showcase-header">
          <h1 className="showcase-title">Community Showcase</h1>
          <p className="showcase-subtitle">See how developers around the world are using React Bits in their projects</p>
          <FadeContent blur delay={500}>
            <a
              href='https://docs.google.com/forms/d/e/1FAIpQLSdlzugJovfr5HPon3YAi8YYSSRuackqX8XIXSeeQmSQypNc7w/viewform?usp=dialog'
              target="_blank"
              rel='noreferrer'
              className="landing-button"
            >
              <span>Submit Your Project</span>
              <div className="button-arrow-circle">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          </FadeContent>
        </div>

        <FadeContent blur duration={1000} className="fade-grid">
          <div className="grid-container">
            {showcaseItems.map((item, index) =>
              <Box as="a" href={item.url} rel="noreferrer" target="_blank" className="grid-item" key={item.url}>
                <img className="showcase-img" src={`https://davidhaz.com/react-bits-showcase/showcase-${index + 1}.webp`} alt={`Showcase website submitted by: ${item.name ? item.name : 'Anonymous'}`} />
                <div className="showcase-info">
                  {item.name && <Text className="author">{item.name}</Text>}
                  <Text className="using">Using {item.using}</Text>
                </div>
              </Box>
            )}

            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
          </div>
        </FadeContent>

      </section >

      <Footer />
    </>
  );
}

export default ShowcasePage;