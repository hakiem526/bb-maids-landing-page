import "./story.css";
import { motion } from "framer-motion";
import FastImage from "../fast-image/fast-image";
import StoryPerson from "../../assets/images/story/mariam-no-bg-1.png";

export function Story() {
  return (
    <section className="story-container" id="story">
      <div className="story-inner">
        {/* LEFT: Heading + subheading */}
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

        {/* MIDDLE: Person (NO FRAME) */}
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

        {/* RIGHT: Body + pills */}
        <motion.div
          className="story-col story-col-right"
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <p className="story-body">
            We know the struggle. BB Maids was founded after watching too many
            families feel lost and stressed trying to find the perfect
            helper—and seeing great helpers placed without the proper support.
          </p>

          <p className="story-body">
            That's why we've <strong>redefined the agency experience</strong>.
          </p>

          <p className="story-body">
            Founded by <strong>Mariam Bibi</strong>, a professional known for
            her dedication to <strong>service</strong> and{" "}
            <strong>after-care</strong>, we prioritize <strong>training</strong>
            , <strong>preparation</strong>, and <strong>ongoing support</strong>. We work closely with training
            partners, personally brief every helper before arrival, and stay
            involved long after placement.
          </p>

          <p className="story-body">
            Our promise is simple: A <strong>high-quality helper</strong> for
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
