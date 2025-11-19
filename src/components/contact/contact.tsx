import { motion } from "framer-motion";
import "./contact.css";
import { FormEvent, useState } from "react";

interface ContactProps {
  id?: string;
}

const TARGET_EMAIL = "hakiemm@hotmail.com"; // "mariambb.y"

export function Contact({ id = "contact-us" }: ContactProps) {
  const [contactError, setContactError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const phone = (
      form.elements.namedItem("contactNumber") as HTMLInputElement
    )?.value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    )?.value.trim();

    if (!phone && !email) {
      e.preventDefault();
      setContactError("Please provide at least a contact number or an email.");
      return;
    }

    setContactError(null);
  };

  return (
    <section className="contact-section" id={id}>
      <div className="contact-inner">
        {/* LEFT: Copy / intro */}
        <motion.div
          className="contact-left"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="contact-sub-header">Contact Us</div>
          <h2 className="contact-header">
            Find the right helper for your home
          </h2>
          <p className="contact-body">
            Tell us a bit about your household, and we’ll follow up with a
            personalised recommendation and next steps.
          </p>

          <div className="contact-highlight-box">
            <p className="contact-highlight-title">What happens next?</p>
            <ul className="contact-highlight-list">
              <li>We review your needs within 1–2 working days</li>
              <li>No obligation — just an honest recommendation</li>
            </ul>
          </div>
        </motion.div>

        {/* RIGHT: Form */}
        <motion.div
          className="contact-right"
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <form
            className="contact-form"
            action={`https://formsubmit.co/${TARGET_EMAIL}`}
            method="POST"
            onSubmit={handleSubmit}
          >
            {/* FormSubmit config */}
            <input type="hidden" name="_subject" value="New BB Maids enquiry" />
            <input type="hidden" name="_template" value="table" />
            {/* CAPTCHA ON by default */}

            <div className="contact-field-row">
              <div className="contact-field">
                <label htmlFor="name" className="contact-label">
                  Name<span className="contact-required">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="contact-input"
                  required
                />
              </div>
            </div>

            <div className="contact-field-row contact-field-row-two">
              <div className="contact-field">
                <label htmlFor="contactNumber" className="contact-label">
                  Contact Number
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  className="contact-input"
                  placeholder="+65 XXXX XXXX"
                />
              </div>
              <div className="contact-field">
                <label htmlFor="email" className="contact-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="contact-input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <p className="contact-helper-text">
              At least <strong>one</strong> of Contact Number or Email is
              required.
            </p>

            <div className="contact-field">
              <label htmlFor="jobscope" className="contact-label">
                Jobscope<span className="contact-required">*</span>
              </label>
              <select
                id="jobscope"
                name="jobscope"
                className="contact-select"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select jobscope
                </option>
                <option value="childcare">Childcare</option>
                <option value="eldercare">Eldercare</option>
                <option value="cooking">Cooking</option>
                <option value="household-chores">Household chores</option>
                <option value="looking-after-pets">Looking after pets</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="contact-field">
              <label htmlFor="message" className="contact-label">
                Message<span className="contact-required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className="contact-textarea"
                rows={4}
                placeholder="Tell us about your family, routines, and what you’re looking for in a helper."
                required
              />
            </div>

            {contactError && (
              <div className="contact-error">{contactError}</div>
            )}

            <button type="submit" className="contact-submit-btn">
              Submit Enquiry
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
