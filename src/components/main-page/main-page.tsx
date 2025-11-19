import { useRef } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import "./main-page.css";
import { Header } from "../header/header";
import { Hero } from "../hero/hero";
import { Services } from "../services/services";
import { Process } from "../process/process";
import { Story } from "../story/story";
import { Testimonials } from "../testimonials/testimonials";
import { Contact } from "../contact/contact";

import WhatsappIcon from "../../assets/images/contact/whatsapp.png";
import { motion } from "framer-motion";
import Footer from "../footer/footer";

const TARGET_HP_NUMBER = "6593679920";

export default function MainPage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Jump to specific section
  const jumpTo = (id: string) => {
    const container = scrollRef.current;
    if (!container) return;
    const target = container.querySelector<HTMLElement>(`#${id}`);
    if (!target) return;
    container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  };

  const jumpToTop = () => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="main-page-container" className="noselect">
      <Header
        onGoTop={jumpToTop}
        onGoServices={() => jumpTo("services")}
        onGoProcess={() => jumpTo("process")}
        onGoStory={() => jumpTo("story")}
        onGoTestimonials={() => jumpTo("testimonials")}
        onGoContactUs={() => jumpTo("contact-us")}
      />

      <div className="main-view">
        <SimpleBar
          style={{ height: "100%" }}
          className="content"
          scrollableNodeProps={{ ref: scrollRef }}
        >
          <div className="page-motion-wrapper">
            <section id="hero" className="section">
              <Hero onGoContactUs={() => jumpTo("contact-us")} />
            </section>

            <section id="services" className="section">
              <Services />
            </section>

            <section id="process" className="section">
              <Process />
            </section>

            <section id="story" className="section">
              <Story />
            </section>

            <section id="testimonials" className="section">
              <Testimonials />
            </section>

            <section id="contact-us" className="section">
              <Contact />
            </section>

            <section id="footer" className="section">
              <Footer />
            </section>
          </div>
        </SimpleBar>

        {/* Floating WhatsApp button */}
        <motion.a
          href={`https://wa.me/${TARGET_HP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Chat with us on WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <img src={WhatsappIcon} alt="WhatsApp" className="whatsapp-icon" />
        </motion.a>
      </div>
    </div>
  );
}
