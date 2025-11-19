import "./footer.css";
import FooterMainLogo from "../../assets/images/LOGO_1_INVERSE.png";
import FacebookLogo from "../../assets/images/footer/facebook.png";
import InstagramLogo from "../../assets/images/footer/instagram.png";
import CallLogo from "../../assets/images/footer/phone-call.png";
import CopyrightLogo from "../../assets/images/footer/copyright.png";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {/* LEFT: main logo + socials */}
        <div className="footer-left">
          <img
            src={FooterMainLogo}
            alt="BB Maids Logo"
            className="footer-main-logo"
          />

          <div className="footer-social-row">
            <a
              href="https://www.facebook.com/bbmaid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="footer-social-link"
            >
              <img
                src={FacebookLogo}
                alt="Facebook"
                className="footer-social-icon"
              />
            </a>

            <a
              href="https://www.instagram.com/bbmaidsagency/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram page"
              className="footer-social-link"
            >
              <img
                src={InstagramLogo}
                alt="Instagram"
                className="footer-social-icon"
              />
            </a>
          </div>
        </div>

        {/* RIGHT: phone + copyright */}
        <div className="footer-right">
          <div className="footer-row">
            <img src={CallLogo} alt="Call" className="footer-row-icon" />
            <a href="tel:+6593679920" className="footer-row-text">
              +65 9367 9920
            </a>
          </div>

          <div className="footer-row">
            <img
              src={CopyrightLogo}
              alt="Copyright"
              className="footer-row-icon"
            />
            <span className="footer-row-text">
              BB Maids Agency, All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
