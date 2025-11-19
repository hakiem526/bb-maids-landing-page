import "./services.css";
import ServicesImg from "../../assets/images/services/services-img.png";
import FastImage from "../fast-image/fast-image";
import FlowerIcon from "../../assets/images/services/flower.png";
import HelperIcon from "../../assets/images/services/housekeeper.png";
import TrainingIcon from "../../assets/images/services/presentation.png";
import SupportIcon from "../../assets/images/services/handshake.png";
import { motion } from "framer-motion";

const SERVICE_CARDS = [
  {
    id: "domestic-helper-placement",
    mainIcon: HelperIcon,
    title: "Domestic Helper Placement",
    body: "Careful matching for childcare, eldercare, and household management",
  },
  {
    id: "training",
    mainIcon: TrainingIcon,
    title: "Training & Certification",
    body: "All helpers attend professional courses in Jakarta, covering cleaning, cooking, safety, and communication",
  },
  {
    id: "support",
    mainIcon: SupportIcon,
    title: "Ongoing Support",
    body: "Regular check-ins and guidance so your home runs smoothly",
  },
];

export function Services() {
  return (
    <section className="services-container" id="services">
      <div className="services-inner">
        <motion.div
          className="services-header"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Services
        </motion.div>

        <div className="services-main">
          {/* LEFT: main composite image */}
          <motion.div
            className="services-left"
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <FastImage
              className="services-img"
              src={ServicesImg}
              alt="BB Maids Services"
            />
          </motion.div>

          {/* RIGHT: vertical cards */}
          <motion.div
            className="services-right"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.25 } },
            }}
          >
            {SERVICE_CARDS.map((card) => (
              <motion.article
                key={card.id}
                className="service-card"
                variants={{
                  hidden: { x: 40, opacity: 0 },
                  visible: { x: 0, opacity: 1 },
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <FastImage
                  className="service-card-main-icon"
                  src={card.mainIcon}
                  alt={"Services Main Icon"}
                />

                <div className="service-card-content">
                  <div className="service-card-header-row">
                    <FastImage
                      className="service-card-tag-icon"
                      src={FlowerIcon}
                      alt={"Flower"}
                    />
                    <h3 className="service-card-title">{card.title}</h3>
                  </div>

                  <p className="service-card-body">{card.body}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
