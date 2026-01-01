import { motion, AnimatePresence } from "framer-motion";
import "./contact.css";
import { FormEvent, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ContactProps {
  id?: string;
}

const TARGET_EMAIL = "mariambb_y@yahoo.com.sg";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function Contact({ id = "contact-us" }: ContactProps) {
  const [contactError, setContactError] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // toast
  const [toastOpen, setToastOpen] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  const formAction = useMemo(
    () => `https://formsubmit.co/ajax/${TARGET_EMAIL}`,
    []
  );

  const closeToast = () => {
    setToastOpen(false);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
  };

  const openToast = () => {
    setToastOpen(true);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);

    toastTimerRef.current = window.setTimeout(() => {
      setToastOpen(false);
      toastTimerRef.current = null;
    }, 4500);
  };

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
      setStatus("error");
      openToast();
      return;
    }

    setContactError(null);
    setStatus("submitting");

    try {
      const formData = new FormData(form);

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
        openToast();
        return;
      }

      setStatus("success");
      form.reset();
      openToast();
    } catch {
      setStatus("error");
      setContactError("Network error. Please try again.");
      openToast();
    }
  };

  const toastVariant = status === "success" ? "success" : "error";
  const toastTitle =
    status === "success" ? "Enquiry sent" : "Submission failed";
  const toastBody =
    status === "success"
      ? "We’ve received your enquiry. We’ll contact you within 3 working days."
      : contactError || "Something went wrong. Please try again.";

  return (
    <section className="contact-section" id={id}>
      <div className="contact-inner">
        {/* LEFT: Copy */}
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

        {/* RIGHT: Form */}
        <motion.div
          className="contact-right"
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="New BB Maids enquiry" />
            <input type="hidden" name="_template" value="table" />

            {/* Name */}
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

            {/* Contact */}
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

            {/* Household */}
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
                  No. of Children<span className="contact-required">*</span>
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
                  No. of Bedrooms<span className="contact-required">*</span>
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

            {/* Preferences */}
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

            {/* Jobscope */}
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

            {/* Message */}
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

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Toast */}
      {createPortal(
        <AnimatePresence>
          {toastOpen && (status === "success" || status === "error") && (
            <motion.div
              className={`contact-toast contact-toast--${toastVariant}`}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              role="status"
              aria-live="polite"
            >
              <div className="contact-toast-icon" aria-hidden="true">
                {toastVariant === "success" ? "✓" : "!"}
              </div>

              <div className="contact-toast-content">
                <div className="contact-toast-title">{toastTitle}</div>
                <div className="contact-toast-body">{toastBody}</div>
              </div>

              <button
                type="button"
                className="contact-toast-close"
                onClick={closeToast}
                aria-label="Close"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
