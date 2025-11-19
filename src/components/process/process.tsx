import "./process.css";
import { motion } from "framer-motion";

import Step1Image from "../../assets/images/process/step-1.png";
import Step2Image from "../../assets/images/process/step-2.png";
import Step3Image from "../../assets/images/process/step-3.png";
import Step4Image from "../../assets/images/process/step-4.png";
import Step5Image from "../../assets/images/process/step-5.png";
import { ProcessCard } from "./process-card/process-card";

const steps = [
  {
    step: 1,
    title: "Tell Us Your Household Needs",
    description:
      "We understand your family’s routines, expectations, and preferred helper profile so we can recommend the right match.",
  },
  {
    step: 2,
    title: "Meet Curated Helper Profiles",
    description:
      "You receive a shortlist of trained Indonesian helpers based on your requirements, complete with interviews and skill evaluations.",
  },
  {
    step: 3,
    title: "Interview & Select Your Helper",
    description:
      "Meet your chosen candidates over video call, ask questions, and select the helper who best fits your home.",
  },
  {
    step: 4,
    title: "Training, Paperwork & Deployment",
    description:
      "We handle all work permit applications, medical checks, training certifications, and travel arrangements.",
  },
  {
    step: 5,
    title: "Settling-In Support & Aftercare",
    description:
      "Once your helper arrives, we continue supporting both sides with guidance, check-ins, and troubleshooting.",
  },
];

const stepImages = [Step1Image, Step2Image, Step3Image, Step4Image, Step5Image];

// Custom per-card scaling
const stepImageScale = [1.1, 1.0, 1.15, 1.05, 1.1];

// Custom per-card positioning
const stepImagePosition = [
  "center center",
  "center right",
  "center top",
  "center bottom",
  "center top",
];

export function Process() {
  return (
    <section className="process-container" id="process">
      {/* Header block animating from top */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="process-sub-header">Our Process</div>
        <div className="process-header">
          How We Choose The Right Helper for You
        </div>
      </motion.div>

      <div className="process-card-container">
        {steps.map((step, index) => {
          const img = stepImages[index];

          return (
            <motion.div
              key={step.step}
              className="process-card-wrapper"
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              <ProcessCard
                width="100%"
                height="400px"
                src={img}
                imageScale={stepImageScale[index]}
                imagePosition={stepImagePosition[index]}
                overlayOpacity={0.18}
                stepLabel={String(step.step)}
                title={step.title}
                body={step.description}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
