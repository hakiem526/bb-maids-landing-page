import { motion } from "framer-motion";
import "./hero.css";
import HeroMainImage from "../../assets/images/hero/hero-img.png";
import FastImage from "../fast-image/fast-image";

interface HeroProps {
  onGoContactUs: () => void;
}

export function Hero({ onGoContactUs }: HeroProps) {
  return (
    <div className="hero-container">
      {/* LEFT: text block, animates from left */}
      <motion.div
        className="hero-left"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="hero-left-header">
          Care you can trust,
          <br />
          Support that lasts
        </div>

        <div className="hero-left-secondary">
          At BB Maids, we connect Singaporean families with professionally
          trained Indonesian helpers.
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <button className="hero-contact-us-btn" onClick={onGoContactUs}>
            Contact Us
          </button>
        </motion.div>
      </motion.div>

      {/* RIGHT: image block, animates from right */}
      <motion.div
        className="hero-right"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <FastImage
          className="hero-img"
          src={HeroMainImage}
          alt="BB Maids Happy Family"
        />
      </motion.div>
    </div>
  );
}
