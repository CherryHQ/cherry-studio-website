import FadeContent from "../../../content/Animations/FadeContent/FadeContent";
import ReactBitsLogo from "../../../assets/logos/react-bits-logo.svg";
import { AiFillHeart } from "react-icons/ai";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FadeContent blur duration={600}>
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-left">
            <img src={ReactBitsLogo} alt="React Bits" className="footer-logo" />
            <p className="footer-description">A library created with <AiFillHeart className="footer-heart" /> by <a href="https://davidhaz.com/" target="_blank" className="footer-creator-link">this guy</a></p>
            <p className="footer-copyright">© {new Date().getFullYear()} React Bits</p>
          </div>

          <div className="footer-links">
            <a href="https://vue-bits.dev/" target="_blank" className="footer-link">Vue Bits</a>
            <a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <Link to="/text-animations/split-text" className="footer-link">Docs</Link>
            <Link to="/showcase" className="footer-link">Showcase</Link>
            <a href="https://www.jsrepo.com/" target="_blank" className="footer-link">CLI</a>
          </div>
        </div>
      </footer>
    </FadeContent>
  );
};

export default Footer;
