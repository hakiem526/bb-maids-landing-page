import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FastImage from "../fast-image/fast-image";
import "./header.css";
import Logo from "../../assets/images/LOGO_1.svg";
import BurgerIcon from "../../assets/images/header/burger-bar.png";

interface HeaderProps {
  onGoTop: () => void;
  onGoServices: () => void;
  onGoProcess: () => void;
  onGoStory: () => void;
  onGoTestimonials: () => void;
  onGoContactUs: () => void;
}

export function Header({
  onGoTop,
  onGoServices,
  onGoProcess,
  onGoStory,
  onGoTestimonials,
  onGoContactUs,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (fn: () => void) => {
    fn();
    closeMobileMenu();
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return; // only listen when menu is open

    function handleClickOutside(e: MouseEvent) {
      const menuEl = menuRef.current;
      const burgerEl = burgerRef.current;

      if (!menuEl || !burgerEl) return;

      // if click is outside menu AND outside burger → close
      if (
        !menuEl.contains(e.target as Node) &&
        !burgerEl.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <div className="header-left" onClick={onGoTop}>
        <FastImage className="header-icon" src={Logo} alt="BB Maids Logo" />
      </div>

      {/* Desktop nav */}
      <nav className="header-nav">
        <button className="jump-btn" onClick={onGoTop}>
          Home
        </button>
        <button className="jump-btn" onClick={onGoServices}>
          Services
        </button>
        <button className="jump-btn" onClick={onGoProcess}>
          Process
        </button>
        <button className="jump-btn" onClick={onGoStory}>
          Our Story
        </button>
        <button className="jump-btn" onClick={onGoTestimonials}>
          Testimonials
        </button>
        <button className="jump-btn contact-btn" onClick={onGoContactUs}>
          Contact
        </button>
      </nav>

      {/* Mobile burger */}
      <button
        ref={burgerRef}
        className="burger-btn"
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        <FastImage className="burger-icon" src={BurgerIcon} alt="Menu" />
      </button>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            ref={menuRef}
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <button
              className="mobile-nav-item"
              onClick={() => handleNavClick(onGoTop)}
            >
              Home
            </button>
            <button
              className="mobile-nav-item"
              onClick={() => handleNavClick(onGoServices)}
            >
              Services
            </button>
            <button
              className="mobile-nav-item"
              onClick={() => handleNavClick(onGoProcess)}
            >
              Process
            </button>
            <button
              className="mobile-nav-item"
              onClick={() => handleNavClick(onGoStory)}
            >
              Our Story
            </button>
            <button
              className="mobile-nav-item"
              onClick={() => handleNavClick(onGoTestimonials)}
            >
              Testimonials
            </button>
            <button
              className="mobile-nav-item mobile-contact-btn"
              onClick={() => handleNavClick(onGoContactUs)}
            >
              Contact
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
