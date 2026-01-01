import { motion, AnimatePresence } from "framer-motion";
import "./contact.css";
import { FormEvent, useMemo, useState } from "react";

interface ContactProps {
  id?: string;
}

const TARGET_EMAIL = "mariambb_y@yahoo.com.sg";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function Contact({ id = "contact-us" }: ContactProps) {
  const [contactError, setContactError] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const formAction = useMemo(
    () => `https://formsubmit.co/ajax/${TARGET_EMAIL}`,
    []
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const phone = (
      form.elements.namedItem("contactNumber") as HTMLInputElement
    )?.value.trim();

    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    )?.value.trim();

    if (!phone && !email) {
      setContactError("Please provide at least a contact number or an email.");
      return;
    }

    setContactError(null);
    setStatus("submitting");

    try {
      const formData = new FormData(form);

      // FormSubmit AJAX endpoint expects JSON response when using /ajax/
      const res = await fetch(formAction, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        setStatus("error");
        setContactError("Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setContactError("Network error. Please try again.");
    }
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
              <li>We review your needs within 3 working days</li>
              <li>No obligation — just an honest recommendation</li>
            </ul>
          </div>
        </motion.div>

        {/* RIGHT: Form / Success */}
        <motion.div
          className="contact-right"
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <div className="contact-card">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  className="contact-success"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <motion.div
                    className="contact-success-icon"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  >
                    ✓
                  </motion.div>

                  <h3 className="contact-success-title">THANK YOU</h3>
                  <p className="contact-success-body">
                    We’ve received your enquiry. We’ll contact you within 3
                    working days.
                  </p>

                  <button
                    type="button"
                    className="contact-submit-btn"
                    onClick={() => setStatus("idle")}
                  >
                    Submit another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* FormSubmit config */}
                  <input
                    type="hidden"
                    name="_subject"
                    value="New BB Maids enquiry"
                  />
                  <input type="hidden" name="_template" value="table" />

                  {/* Basic */}
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

                  <div className="contact-section-title">Household details</div>

                  <div className="contact-field-row contact-field-row-two">
                    <div className="contact-field">
                      <label htmlFor="numAdults" className="contact-label">
                        No. of Adults<span className="contact-required">*</span>
                      </label>
                      <input
                        id="numAdults"
                        name="numAdults"
                        type="number"
                        min={0}
                        max={20}
                        className="contact-input"
                        required
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="numChildren" className="contact-label">
                        No. of Children
                        <span className="contact-required">*</span>
                      </label>
                      <input
                        id="numChildren"
                        name="numChildren"
                        type="number"
                        min={0}
                        max={20}
                        className="contact-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-field-row contact-field-row-two">
                    <div className="contact-field">
                      <label htmlFor="homeType" className="contact-label">
                        Home Type<span className="contact-required">*</span>
                      </label>
                      <select
                        id="homeType"
                        name="homeType"
                        className="contact-select"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select home type
                        </option>
                        <option value="hdb">HDB</option>
                        <option value="condo">Condo</option>
                        <option value="landed">Landed</option>
                        <option value="others">Others</option>
                      </select>
                    </div>

                    <div className="contact-field">
                      <label htmlFor="bedrooms" className="contact-label">
                        No. of Bedrooms
                        <span className="contact-required">*</span>
                      </label>
                      <input
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        min={0}
                        max={12}
                        className="contact-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-section-title">Preferences</div>

                  <div className="contact-field">
                    <label htmlFor="maidAgeRange" className="contact-label">
                      Preferred Helper Age Range
                      <span className="contact-required">*</span>
                    </label>
                    <select
                      id="maidAgeRange"
                      name="maidAgeRange"
                      className="contact-select"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select age range
                      </option>
                      <option value="20-30">20–30</option>
                      <option value="30-40">30–40</option>
                      <option value="gt-40">&gt; 40</option>
                    </select>
                  </div>

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
                      <option value="looking-after-pets">
                        Looking after pets
                      </option>
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
                      placeholder="Any other specifications about your family, routines, and what you’re looking for in a helper."
                      required
                    />
                  </div>

                  {contactError && (
                    <div className="contact-error">{contactError}</div>
                  )}

                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting"
                      ? "Submitting..."
                      : "Submit Enquiry"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
