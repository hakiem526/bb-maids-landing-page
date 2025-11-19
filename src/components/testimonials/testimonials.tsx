import { motion } from "framer-motion";
import "./testimonials.css";

const TESTIMONIALS = [
  {
    name: "Rose",
    review:
      "I am extremely pleased with the exceptional service provided by BBmaids. Mariam demonstrated professionalism and efficiency throughout the entire process and introduced me to a capable and trustworthy domestic helper. I highly recommend her service.",
  },
  {
    name: "N.",
    review:
      "With our helper, Dwi's assistance and support at home, my mother-in-law is well-taken care of. Dwi is incredibly patient and kind, and has quickly fostered a good relationship with my mother-in-law. Clearly, she is a perfect fit for the family. Her support has brought us immense peace of mind.",
  },
  {
    name: "Haziam",
    review:
      "Heartfelt Thanks to BB Maids! ❤️ We're truly grateful to BB Maids for finding us a wonderful helper who has been such a blessing to our family. She takes great care of our elderly mother with patience, kindness, and genuine love. ❤️",
  },
  {
    name: "H.",
    review:
      "Thank you, BB Maids, for always matching us with responsible and caring helpers. Highly recommended for families who need trustworthy support for their loved ones.",
  },
  {
    name: "Jan",
    review:
      "Thank you, BBmaids, for the excellent service in helping us find our helper, Eva. From the very start, the team was professional, patient, and attentive to our needs. Eva has been a true blessing - she cared for my late mother-in-law until her passing and now looks after my father-in-law and 4-year-old child, all while managing household chores with great responsibility and positivity.",
  },
  {
    name: "R.",
    review:
      "Our helper, Novita, has been working with us for almost three years. After undergoing some training, Novita now has basic elderly caregiving skills. She is able to provide good care to my elderly family member and to the entire family. Novita is also motivated to learn basic English, as she understands it is important for communicating with others. A BIG thank you to BB Maids Agency for their awesome services!!!",
  },
  {
    name: "N.",
    review:
      "I am grateful to Mariam for her crucial role in procuring the right helper for the family. The process felt tailored to our specific needs, and we successfully found the support we needed during a difficult time. I highly recommend the services of Mariam and BB Maids.",
  },
  {
    name: "Fairuz",
    review:
      "What truly sets BB Maids Agency apart is their ongoing support and commitment. They've maintained regular communication, checking in to ensure everything is running smoothly and addressing any minor concerns promptly and effectively. This level of dedication is rare and incredibly reassuring.",
  },
  {
    name: "J.",
    review:
      "We've just renewed our helper's contract and are confident we'll continue to appreciate both her positive attitude and quality of work. The entire process, from selection to deployment, was seamless. I highly recommend BB Maids to anyone seeking a reliable and trustworthy helper.",
  },
  {
    name: "Rosawati",
    review:
      "We are impressed with BB Maids Agency's services and their professionalism. BB Maids is highly recommended to any family looking for a reliable domestic helper. During the process of securing a helper, Ms. Mariam delivered excellent service by providing us with detailed profiles of selected helpers, keeping us updated on MOM's rules and regulations, and clearly explaining the employment contract and working methodology.",
  },
  {
    name: "Nor",
    review:
      "When my elderly mother-in-law was diagnosed with dementia coupled with major chronic illnesses, it was clear that the family needed a live-in helper to provide the necessary care and home support. Mariam from BB Maids was a huge help in this aspect. She promptly shortlisted candidates and arranged face-to-face interviews so that the family could assess their suitability.",
  },
];

// Duplicate for seamless infinite scroll
const MARQUEE_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS];

export function Testimonials() {
  return (
    <section className="testimonials-container" id="testimonials">
      <div className="testimonials-inner">
        {/* Header block animates down from top */}
        <motion.div
          className="testimonials-header-block"
          initial={{ y: -24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="testimonials-sub-header">Testimonials</div>
          <h2 className="testimonials-header">
            Families who trust{" "}
            <span className="testimonials-brand">BB Maids</span>
          </h2>
        </motion.div>

        {/* Infinite marquee carousel */}
        <motion.div
          className="testimonials-viewport"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <motion.div
            className="testimonials-marquee"
            // scroll from 0 to -50% (because we duplicated content) and loop
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 100, // slower = more chill
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {MARQUEE_ITEMS.map((item, index) => (
              <div className="testimonial-card" key={`${item.name}-${index}`}>
                <div className="testimonial-name">{item.name}</div>

                <div className="testimonial-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="testimonial-star">
                      ★
                    </span>
                  ))}
                </div>

                <p className="testimonial-body">{item.review}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
