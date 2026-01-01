import "./story.css";
import { motion } from "framer-motion";
import FastImage from "../fast-image/fast-image";
import StoryPerson from "../../assets/images/story/mariam-no-bg-2.png";

export function Story() {
  return (
    <section className="story-container" id="story">
      <div className="story-inner">
        {/* HEADER (full width) */}
        <motion.div
          className="story-col story-col-left"
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="story-sub-header">Our Story</div>
          <h2 className="story-header">
            A family agency built around trust and care
          </h2>
        </motion.div>

        {/* IMAGE (left col) */}
        <motion.div
          className="story-col story-col-middle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        >
          <FastImage
            className="story-person-img"
            src={StoryPerson}
            alt="Founder standing"
          />
        </motion.div>

        {/* TEXT (right col) */}
        <motion.div
          className="story-col story-col-right"
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <p className="story-body">
            BB Maids was founded after seeing too many families feel overwhelmed
            while searching for the right helper — and too many good helpers
            placed without the guidance and support they deserved.
          </p>

          <p className="story-body">
            The process often felt rushed and transactional, leaving families
            uncertain and helpers to adapt on their own.
          </p>

          <p className="story-body">
            That’s why we chose to{" "}
            <strong>redefine the agency experience</strong>.
          </p>

          <p className="story-body">
            Founded by <strong>Mariam Bibi</strong>, a professional known for
            her dedication to <strong>service</strong> and{" "}
            <strong>after-care</strong>, BB Maids is a family-run agency built
            around <strong>training</strong>, <strong>preparation</strong>, and{" "}
            <strong>ongoing support</strong>. We work closely with training
            partners, personally brief every helper before arrival, and stay
            involved long after placement.
          </p>

          <p className="story-body">
            Our promise is simple: a <strong>high-quality helper</strong> for
            your home, and true <strong>peace of mind</strong> for your family.
          </p>

          <div className="story-pill-row">
            <div className="story-pill">Indonesian-only helpers</div>
            <div className="story-pill">Family-run agency</div>
            <div className="story-pill">Hands-on aftercare</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
